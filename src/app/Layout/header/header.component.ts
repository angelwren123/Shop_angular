import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,private cart:CartService) { }
  public flag:any;
  public booleandb:any;
  public productsInCart: any;
  ngOnInit(): void {
    let strAdmin = localStorage.getItem('admin');
    let strUser = localStorage.getItem('user');
    if((!strAdmin && strUser)||(strAdmin && !strUser)){
      this.authService.booleanSubject.next(true);
    }
    if((strAdmin)){
      this.authService.booleanDashboard.next(true);
    }
    this.authService.booleanSubject.subscribe(data=>{
      this.flag = data;
    })
    this.authService.booleanDashboard.subscribe(data=>{
      this.booleandb = data;
    })

  }
  public logout(){
    console.log('dang xuat')
    this.authService.booleanSubject.next(false)
    this.authService.booleanDashboard.next(false)
    this.cart.carts=[];
    this.productsInCart =  localStorage.removeItem('carts')
    this.authService.doLogout();
  }
}
