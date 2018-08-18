/**
 * Schema for Product Object
 */
export class Product {
  /**
  * Product ID
  */
  _id: string;
  /**
  * Product Name
  */
  name: string;
  /**
  * Product Description
  */
  description: string;
  /**
  * Product Type ie.strong, mild, sweet
  */
  type: string;
  /**
  * Product rating
  */
  rating?: number;
  /**
  * Product Image
  */
  image: string;
  /**
  * Product Size Small
  */
  small: number;
  /**
  * Product Size Medium
  */
  medium: number;
  /**
  * Product Size Large
  */
  large:number;

constructor() {}

}
