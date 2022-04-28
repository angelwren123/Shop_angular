import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Admin } from 'src/app/models/admin.model';
import { CommonService } from 'src/app/Services/common.service';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // admin:Admin = new Admin;
  // user:User = new User;

  constructor(private router:Router, private authService:AuthService,private common:CommonService) {
  }

  checkAcc:boolean=false;
  ngOnInit(): void {
    let strAdmin = localStorage.getItem('admin');
    let strUser = localStorage.getItem('user');
    if(strAdmin || strUser){
        this.checkAcc=true
    }

  }
  loginForm: FormGroup = new FormGroup({
    user: new FormControl(),
    pass:new FormControl()
  });
  onSubmit2(){
    console.log(this.loginForm.value)
    if(this.authService.doLogin(this.loginForm.value)){
      this.authService.booleanDashboard.next(true);
      this.router.navigate(['dashboard']);
    }
    // kiểm tra thử phải user hay k
    else if(this.authService.doLoginUser(this.loginForm.value)){
      this.authService.booleanSubject.next(true);
      console.log('chay vo r')
      this.router.navigate(['home']);
    }
    else {
      alert('Sai tài khoản hoặc mật khẩu!')
    }

  }
  // onSubmit(frm:any){
  //   if(frm.valid){
  //     console.log(frm)
  //     // Kiểm tra thử phải admin hay k
  //     if(this.authService.doLogin(this.admin)){
  //       this.router.navigate(['dashboard']);
  //     }
  //     // kiểm tra thử phải user hay k
  //     if(this.authService.doLoginUser(this.user)){
  //       console.log('chay vo r')
  //       this.router.navigate(['home']);
  //     }
  //   }else{
  //     alert('Vui lòng nhập đủ thông tin đăng nhập!')
  //   }
  // }
}
