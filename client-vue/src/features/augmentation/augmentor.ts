/* Augmentor takes in a service object and augments it with
n steps with n layers */

type Augmentable = any;
type AugmentableService<T> = T;


class Augmentor<Augmentable> {
   layer: Map<Symbol, Augmentable[]>;

   constructor () {
      this.layer = new Map();
   }
}


const InvoiceCore = () => {

   let test = "hei fra invoice core";


};

const CostInvoiceCore = () => {

   let test = "hei fra cost invoice";

};


const augmentor = new Augmentor<any>();
augmentor.layer.set(, value );