import { Order } from "./order";

/**
 * Schema for User Details Object
 */
export class UserDetails {
    /**
     * User ID
     */
  _id: string;
    /**
     * User email address
     */
  email: string;
  /**
     * User Name
     */
  name: string;
  exp: number;
  iat: number;
  /**
   * Order History of User
   */
  orderHistory: Array<Order>;
   /**
     *Unplaced Order present in Cart 
     */
  inCart: Order;

    constructor(){
      this._id="";
      this.email="";
      this.exp=0;
      this.iat=0;
      this.orderHistory=[];
      this.inCart=new Order();
    }
  }
