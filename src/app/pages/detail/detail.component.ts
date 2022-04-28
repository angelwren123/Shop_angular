import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from 'src/app/Services/cart.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  routeSub: Subscription|any;
  constructor(private common:CommonService,
  private route:ActivatedRoute,
  private cart:CartService) { }
  numberParams: any;
  public productsInCart:any;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.numberParams = parseInt(params['id'])
      console.log(this.numberParams)
      if(this.numberParams>0){
        this.load(this.numberParams);
      }
    });
    //
    this.productsInCart =  JSON.parse(localStorage.getItem('carts') || '');
    console.log(this.cart.carts)
  }
  public aProduct:any;
  load(id:number){
    this.common.getAProduct(id).then((data)=>{
      this.aProduct=data;
      console.log(this.aProduct)
    })
  }

  public addToCart(){
    if(this.productsInCart){
      const check = this.productsInCart.every((item:any)=>{
        return item.id !== this.aProduct.id;
      })
      console.log(check)
      if(check){
        const data = this.cart.allProduct.filter((item:any)=>{
          return item.id === this.aProduct.id;
        })
        this.productsInCart = [...this.productsInCart,...data];
      }
        this.productsInCart.forEach((item:any) => {
          if(item.id === this.aProduct.id){
            item.quantity+=1;
          }
        });
      localStorage.setItem('carts',JSON.stringify(this.productsInCart))
    }else{
      const check = this.cart.carts.every((item:any)=>{
        return item.id !== this.aProduct.id;
      })
      console.log(check)
      if(check){
        const data = this.cart.allProduct.filter((item:any)=>{
          return item.id === this.aProduct.id;
        })
        this.cart.carts = [...this.cart.carts,...data];
      }
        this.cart.carts.forEach((item:any) => {
          if(item.id === this.aProduct.id){
            item.quantity+=1;
          }
        });
      localStorage.setItem('carts',JSON.stringify(this.cart.carts))
      console.log(this.cart.carts)
    }

  }

}
