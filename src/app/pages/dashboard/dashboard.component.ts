import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public flag:any;
  constructor(private common:CommonService,private route:Router,private authService:AuthService) { }
  public products: Products|any;
  ngOnInit(): void {
    let strAdmin = localStorage.getItem('admin');
    if(strAdmin){
      this.flag = true;
      this.authService.booleanSubject.next(true);
    }else{
      this.flag =false;
      this.authService.booleanSubject.next(false);
    }
    this.doLoad();

  }

  doLoad() {
    this.common.getProducts('').then((data) => {
      console.log(data);
      this.products=data;
    });
  }
  handleDelete(id:number){
    this.common.deleteProduct(id).then((data)=>{
      console.log(data);
      this.doLoad();
    }).catch((err)=>{
      console.log('Lỗi!',err)
    })
  }
  handleUpdate(id:number){
    // console.log(id)
    this.route.navigate(['form/',id]);
  }
}
