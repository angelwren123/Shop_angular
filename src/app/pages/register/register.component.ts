import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import {AuthService} from '../../Services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private common:CommonService, private route:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.common.getUser('').then(data=>{
      console.log(data)
    })
  }
  registerForm=new FormGroup({
    user : new FormControl(),
    pass : new FormControl()
  })
  onSubmit(){
    console.log(this.registerForm.value)
    this.common.postUser(this.registerForm.value).then((data)=>{
      this.authService.doLoadUser()
      alert('Đăng kí thành công!')
      this.route.navigate(['login'])
    })
  }
}
