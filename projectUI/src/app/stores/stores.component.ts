import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { } from '@types/googlemaps';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { containerEnd } from '@angular/core/src/render3/instructions';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  show: boolean = false;
  map: google.maps.Map;
  infoWindow: any;
  pos: any;
  stores: any[];
  raduisOfSearch: any;
  yourlocation: any;
  markers: any[];
  zipcode: string;
  selectedStore: any;
  orderBy: string;
  unsortedStores: any[];
  @ViewChild('map') myId: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('sort') sortSelect: ElementRef;

  constructor(private main: MainService, private router: Router) {
    this.markers = [];
    this.stores = [];
  }

  /**
   * Load Map on the window and bind desired properties
   */
  ngOnInit() {
    this.orderBy="";
    this.infoWindow = new google.maps.InfoWindow;
    this.map = new google.maps.Map(this.myId.nativeElement, {
      center: new google.maps.LatLng(42.3600830, -71.0588800),
      zoom: 13,
    });
    this.getLocation.bind(this);
    this.getCafesFromZip.bind(this);
    this.smoothZoom.bind(this);
  }

  ngAfterContentInit() {

  }

  /**
   * Display list of cafes based on user input (zipcode/address)
   */
  getCafesFromZip() {
    this.selectedStore = null;
    let resp = this.main.getLocationFromZip(this.zipcode);
    resp.subscribe(result => {
      if (result.status == "OK") {
        this.pos = result.results[0].geometry.location;
        this.initMap();
      }
      else {
        alert("No such zipcode");
        return;
      }
    }, (err) => {
      console.error(err);
    });
  }

  /**
   * 
   */
  focus() {
    this.map.setCenter(this.pos);
    this.map.setZoom(16);
  }

  /**
   * Based on user location, focus nearby cafes on map.
   */
  getLocation() {
    this.selectedStore = null;
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        that.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(that.pos);

        console.log("init before center");
        that.initMap();
        console.log("init ended");

      }, function () {
        console.log("error inside getlocation if");
        that.handleLocationError(true, that.infoWindow, that.map.getCenter());
      });
    } else {
      console.log("error inside getlocation else");
      // Browser doesn't support Geolocation
      that.handleLocationError(false, that.infoWindow, that.map.getCenter());
    }
  }

  drawCircles() {
    if (this.raduisOfSearch !== undefined) {
      this.raduisOfSearch.setMap(null);
      this.yourlocation.setMap(null);
    }
    this.focus();
    this.raduisOfSearch = new google.maps.Circle({
      strokeColor: '#4488f4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4488f4',
      fillOpacity: 0.2,
      map: this.map,
      center: this.pos,
      radius: 500
    });
    this.yourlocation = new google.maps.Circle({
      strokeColor: '#4488f4',
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: '#4488f4',
      fillOpacity: 0.8,
      map: this.map,
      center: this.pos,
      radius: 20
    });
  }

  initMap() {
    this.stores = [];
    this.drawCircles();

    this.main.cafes(this.pos).subscribe(result => {
      result.forEach(store => {
        this.stores.push({ store: store, selected: false })
      });
      this.callback(result)
    }, (err) => {
      console.log(err);
    });
    this.map.setZoom(15);
   // this.unsortedStores = Object.assign(this.stores);
  }

  callback(results) {
    this.unsortedStores=JSON.parse(JSON.stringify(this.stores));
    this.markers.forEach(mark => mark.setMap(null));
    for (var i = 0; i < results.length; i++) {
      this.createMarker(results[i]);
    }

  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(marker);
    google.maps.event.addListener(marker, 'click', function (event) {
      this.markerClicked(marker, place);
      let index = this.stores.findIndex(s => s.store.place_id == place.place_id);
      this.listClicked(this.stores[index]);
    }.bind(this));
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    this.infoWindow.open(this.map);
  }

  listClick(event, store) {
    this.listClicked(store);
    let index = this.stores.findIndex(s => s.store.place_id == store.store.place_id);
    this.markerClicked(this.markers[index], store.store);

  }
  listClicked(store) {
    this.stores.forEach(store => store.selected = false);
    store.selected = !store.selected;
    this.selectedStore = store.store;
    let index = this.stores.findIndex(s => s.store.place_id == store.store.place_id);
    this.scrollTo(index);
  }
  markerClicked(marker, place) {
    this.map.setZoom(15);
    this.smoothZoom(this.map, 18, this.map.getZoom());
    let content = '<div><div style="font-weight:bold;">' + place.name + '</div><span>Address: ' + place.vicinity + '</span>';
    if (place.rating != undefined)
      content += '<div> Rating: ' + place.rating + '</div>';
    content += '</div>';
    this.infoWindow.setContent(content);


    this.map.setCenter(marker.getPosition());
    this.infoWindow.open(this.map, marker);
  }
  scrollTo(index) {
    let e = this.list.nativeElement.children[index];
    let topPos = e.offsetTop;
    this.list.nativeElement.scrollTop = topPos - 180;
  }
  smoothZoom(map, max, cnt) {
    let that = this;
    if (cnt >= max) {
      return;
    }
    else {
      let z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
        google.maps.event.removeListener(z);
        that.smoothZoom(map, max, cnt + 1);
      });
      setTimeout(function () { map.setZoom(cnt) }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
  }

  /**
   * Sort the List of Cafes based on user criteria
   * @param event {User selection from the list}
   */
  sort(event) {
    this.orderBy=event;
    if (this.orderBy.toLowerCase() == "relevance") {
      this.stores = JSON.parse(JSON.stringify(this.unsortedStores));
    }
    else
      this.stores.sort(this.sortAZ(this.orderBy));
  }
  sortAZ(orderby) {
    return function (a, b) {
      const nameA = a.store.name.toUpperCase();
      const nameB = b.store.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return orderby == "desc" ? comparison * -1 : comparison;
    }
  }
}
