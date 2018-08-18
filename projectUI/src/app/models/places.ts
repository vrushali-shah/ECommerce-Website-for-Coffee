/**
 * Schema for Stores Nearby
 */
export class Places {
   /**
    * ID
    */
  id: Number;
  /**
    * Store name
    */
  name: string;
  /**
    * Store Location
    */
  location: { lat: string, lan: string };
  /**
    * Store icon
    */
  icon: string;
  /**
    * Place ID for identifying the store
    */
  place_id: string;
  /**
    * Store vicinity 
    */
  vicinity: string;
  
    constructor(id: Number, name: string, location: {lat:string,lan:string} ,
                icon:string, place_id:string, vicinity:string) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.icon =icon;
        this.place_id=place_id;
        this.vicinity=vicinity;
    }
}
