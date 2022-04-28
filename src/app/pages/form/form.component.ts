import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  routeSub: Subscription|any;
  // modelProducts:Products = new Products();
  numberParams: any;
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    type:new FormControl(),
    price: new FormControl(),
    image:new FormControl(),
    quantity: new FormControl(),
    desc: new FormControl(),
  });
  constructor(private common:CommonService,
    private route:ActivatedRoute, private navi:Router) { }
  ngOnInit(): void {
     this.route.params.subscribe(params => {
      // console.log(params) //log the entire params object
      // console.log(params['id']) //log the value of id
      this.numberParams = parseInt(params['id'])
      console.log(this.numberParams)
    });

    if(this.numberParams>0){
      this.common.getAProduct(this.numberParams).then((data:any)=>{
        this.productForm = new FormGroup({
          name:new FormControl(data.name),
          type:new FormControl(data.type),
          price: new FormControl(data.price),
          image:new FormControl(data.image),
          quantity: new FormControl(data.quantity),
          desc: new FormControl(data.desc),
        })
      })
    }
  }

  onSubmit(){
    var textImage =  this.productForm.value.image.slice((12));
    console.log(textImage);
    this.productForm.value.image = textImage;
    this.productForm.value.quantity =0;
    console.log(this.productForm.value);
    if(this.numberParams>0){
      this.common.putProduct(this.numberParams,this.productForm.value).then((data)=>{
        console.log(data);
        this.navi.navigate(['dashboard'])
      }).catch((err)=>{
        console.log('Lỗi!',err);
      })
    }else{
      this.common.postProduct(this.productForm.value).then((data)=>{
        console.log(data);
        this.navi.navigate(['dashboard'])
      }).catch((err)=>{
        console.log('Lỗi!',err);
      })
    }
  }
}
