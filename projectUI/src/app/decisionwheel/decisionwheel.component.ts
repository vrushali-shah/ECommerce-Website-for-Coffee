import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'decision-wheel',
  templateUrl: './decisionwheel.component.html',
  styleUrls: ['./decisionwheel.component.scss']
})
export class DecisionwheelComponent implements OnInit {

  constructor(public myElement: ElementRef) {
  
   }

  rotations:number;
  interval:any;
  discount:number
  used:boolean;
  @ViewChild('wheel') wheel:ElementRef; 

   ngOnInit() {
      this.used=false;
    this.rotations=0;
    this.start.bind(this);
    this.stop.bind(this);
    this.discount=0;
   }

   start(){
     this.discount=0;
     this.used=true;
    this.rotations=0;
    this.interval=window.setInterval(()=>{this.rotations+=10;
      this.wheel.nativeElement.style.transform = "rotate("+this.rotations+"deg)";},10);
   }
   stop(){
    clearInterval(this.interval);
    console.log(this.discount);
    this.discount=this.rotations/360;
    console.log(this.discount);
    this.discount=this.discount%1*360;;
    console.log(this.discount);
    this.discount=360-this.discount;
    console.log(this.discount);
    this.discount=this.discount/40;
    console.log(this.discount);
    this.discount=Math.ceil(this.discount);
    console.log(this.discount);
    this.rotations=0;
   }
   
   turn(){
    this.rotations+=10;
    this.wheel.nativeElement.style.transform = "rotate("+this.rotations+"deg)";
   }
   ngOnDestroy(){
     clearInterval(this.interval)
   }
}
