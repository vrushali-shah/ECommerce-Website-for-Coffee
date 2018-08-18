import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<any> = [];

  /**
   * Images for carousel
   */
  constructor() {
    this.items = [
      { name: 'assets/images/banner2.jpg' },
      { name: 'assets/images/banner1.jpg' },
      { name: 'assets/images/banner7.JPG' },
      { name: 'assets/images/banner4.jpg' },
      { name: 'assets/images/banner5.jpg' },
      { name: 'assets/images/imagee.jpg' },
      { name: 'assets/images/banner6.jpg' },
      { name: 'assets/images/Moon.gif' },
    ]
  }

  ngOnInit() {
  }

}
