import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  product_price: number;
  displayCardNumber: string;
  inCart:Order;
  constructor(private main: MainService,private route: ActivatedRoute,
    private router: Router) { }

  /**
   * Fetch Order data from previous pages
   */
  ngOnInit() {
    this.route.data
    .subscribe((data: any) => {
       this.inCart=data.main.orderHistory[data.main.orderHistory.length-1];
      console.log(this.inCart);
      this.displayCardNumber = this.inCart.payment.cardNumber.substring(0, 4) + "************";
    });
  }

  /**
   * Save and Print page contents in desired format
   */
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=700%,width=1000%');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Order Invoice</title>
          <style>
          //........Customized style.......
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
