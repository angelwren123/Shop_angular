import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../models/admin.model';
import { User } from '../models/user.model';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public booleanSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public booleanDashboard: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public resUser:any;
  public resAdmin:any;
  constructor(private route:Router,private common:CommonService) {
    this.doLoadAdmin();
    this.doLoadUser();
    console.log('first')
  }

  doLoadUser(){
    this.common.getUser('').then((data)=>{
      this.resUser=data
    })
  }
  doLoadAdmin(){
    this.common.getAdmin('').then((data)=>{
      this.resAdmin=data
    })
  }
  // kiểm tra trong localstorage có 'admin' or 'user' hay chưa?
  checkLogin(){
    let strAdmin = localStorage.getItem('admin');
    let strUser = localStorage.getItem('user');
    if(strAdmin){
      let admin = <Admin>JSON.parse(strAdmin);
      return this.verifyLogin(admin);
    }
    if(strUser){
      let user = <User>JSON.parse(strUser);
      return this.verifyLoginUser(user);
    }

    return false;
  }

  //kiểm tra user & pass của admin
  verifyLogin(admin:Admin){
    const kq  = this.resAdmin.filter((data:any)=>{
      return admin.user==data.user && admin.pass==data.pass
    })
    if(kq.length>0){
      return true
    }
    return false;
  }

  //xử lý đăng nhập nếu đúng sẽ Set user & pass của admin vào localstorage
  doLogin(admin:Admin){
    if(this.verifyLogin(admin))
    {
      localStorage.setItem('admin', JSON.stringify(admin));
      return true;
    }
    return false;



  }

  // logout
  doLogout(){
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.route.navigate(['home'])
  }



  //kiểm tra user & pass của user
  verifyLoginUser(user:User){
    const kq  = this.resUser.filter((data:any)=>{
      return user.user==data.user && user.pass==data.pass
    })
    if(kq.length>0){
      return true
    }
    return false;
  }
  //xử lý đăng nhập nếu đúng sẽ Set user & pass của user vào localstorage

  doLoginUser(user:User){
    if(this.verifyLoginUser(user))
    {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

}
