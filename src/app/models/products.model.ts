export class Products {
  id: number=0;
  name:string='';
  type:string='';
  price:number=0;
  image:string='';
  quantity:number=0;
  desc:string='';
  constructor(
    id:number=0,
    name:string='',
    type:string='',
    price:number=0,
    image:string='',
    quantity:number=0,
    desc:string='',
  ){
      this.id =id;
      this.name = name;
      this.type = type;
      this.price = price;
      this.image = image;
      this.quantity=quantity;
      this.desc = desc;
  }
}
