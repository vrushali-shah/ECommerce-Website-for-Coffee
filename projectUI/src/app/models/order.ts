import { Product } from './product';
import { UserDetails } from './UserDetails';

/**
 * Schema for Payment Object
 */
class Payment{
  /**
   * Card Holder Name for User Payment
   */
  holderName: string;
  /**
   * Card Number 
   */
  cardNumber: string;
  /**
   *CVV Number 
   */
  cvv: number;
  /**
   * Expiry Month 
   */
  month: string;
  /**
   * Expiry Year 
   */
  year: string;

  constructor(){
    this.cardNumber="";
    this.cvv=0;
    this.holderName="";
    this.month="";
    this.year="";
  }
};

/**
 * Schema for Order object
 */
export class Order {
  /**
   * Order ID
   */
  _id: string;
  /**
   * Total Cost of all products in Order
   */
  totalCost: Number;
  /**
   * User who placed the Order
   */
  user: UserDetails;
  /**
   * Date when order was placed
   */
  orderDate: Date;
  /**
   * Receiver name
   */
  receiverName: string;
  /**
   * Store Name where order is placed
   */
  placeName: string;
  /**
   * Store address where order is placed
   */
  placeAddress: string;
  /**
   * Payment details for Order Payment
   */
  payment: Payment;
  /**
   * Products in the Order
   */
  productList: {
    size: string;       //product size i.e. small/medium/large
    qty: number;        //quantity
    product: Product;   //Product details
  }[];
  
  constructor(){
    this._id=""
    this.totalCost=0;
    this.user=null;
    this.orderDate=new Date();
    this.receiverName="";
    this.placeName="";
    this.placeAddress=""
    this.productList=[];
    this.payment=new Payment();

  }
}
