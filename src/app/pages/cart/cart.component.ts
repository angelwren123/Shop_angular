import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private route:Router) {

  }
  public productsInCart:any;
  public total = 0;
  ngOnInit(): void {
    this.productsInCart =  JSON.parse(localStorage.getItem('carts') || '');
    console.log(this.productsInCart)
    for(let i=0;i<this.productsInCart.length;i++){
      console.log(this.productsInCart[i].quantity)
      console.log(this.productsInCart[i].price)
      this.total = this.productsInCart[i].price * this.productsInCart[i].quantity + this.total;
    }

  }

  public increase(props:any){
  //   this.cart.carts.forEach((item:any) => {
  //     if(item.id === props.id){
  //       item.quantity = item.quantity + 1;
  //     }
  //     return item.quantity;
  //  });

    this.productsInCart.forEach((item:any) => {
       if(item.id === props.id){
         item.quantity = item.quantity + 1;
         this.total=this.total+item.price;

       }
       return item.quantity;
    });


    localStorage.setItem("carts",JSON.stringify(this.productsInCart));
  }

  public decrease(props:any){
  //   this.cart.carts.forEach((item:any) => {
  //     if(item.id === props.id){
  //       item.quantity = item.quantity - 1;
  //     }
  //     return item.quantity
  //  });
    this.productsInCart.forEach((item:any) => {
       if(item.id === props.id){
         item.quantity = item.quantity - 1;
         this.total=this.total-item.price;

       }
       return item.quantity
    });
    localStorage.setItem("carts",JSON.stringify(this.productsInCart));
  }

  public deleteItemCart(props:any){
    // this.cart.carts.forEach((item:any,index:number) => {
    //     if(item.id === props.id){
    //       item.quantity=0;
    //       return this.cart.carts.splice(index,1)
    //     }
    // });
    this.productsInCart.forEach((item:any,index:number) => {
      if(item.id === props.id){
        this.total=this.total - props.price*props.quantity;
        item.quantity=0;
        console.log(this.total)
        return this.productsInCart.splice(index,1)
      }
    });
    localStorage.setItem("carts",JSON.stringify(this.productsInCart));
  }

  paymentForm = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),

  })

  onSubmit(){
      console.log(this.paymentForm.value);
      var regexEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
      if (!regexEmail.test(this.paymentForm.value.email))
      {
        alert("Email không hợp lệ!")
      }else if(!regexPhone.test(this.paymentForm.value.phone)){
        alert("Số điện thoại không hợp lệ!")
      }else{
        alert('Thanh toán thành công!')
        this.route.navigate(['products'])
        localStorage.removeItem('carts');
      }
    }


}
