import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public carts = [] as any  ;
  public allProduct=[]as any;
  constructor(private common:CommonService) {
    this.common.getProducts('').then((data)=>{
      console.log(data);
      this.allProduct=data;
    })
  }
}
