import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Products } from 'src/app/models/products.model';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(public common:CommonService, private route:Router) { }
  public products: any;
  // public filterText="";
  // public filterProducts = new Subject<string>();
  public productsOriginal:any;
  public selectedSort="";
  public sort=["Mặc định", "A - Z","Z - A", "Giá tăng", "Giá giảm"];
  public searhTxt: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  ngOnInit(): void {
    this.common.getProducts('').then((data)=>{
      this.products=data;
      this.productsOriginal=data;
    })

    // this.filterProducts.pipe(
    // debounceTime(700),
    // distinctUntilChanged())
    // .subscribe(value=>{
    //   this.filterText = value.trim().toLowerCase();
    //   console.log(value);
    //   this.products=this.productsOriginal.filter((item:any)=>{
    //     return item.name.toString().toLowerCase().includes(this.filterText)
    //   });
    //   console.log('data', this.products)
    // })
  }
  sapxep(){
    console.log(this.selectedSort)

      if(this.selectedSort.toString()=="Mặc định"){
          this.common.getProducts('').then((data)=>{
            this.products=data;
          });
      }
      if(this.selectedSort.toString()=="A - Z"){
        this.common.getProductsSortNameAsc('').then((data)=>{
          this.products=data;
        });
      }
      if(this.selectedSort.toString()=="Z - A"){
        this.common.getProductsSortNameDesc('').then((data)=>{
          this.products=data;
        });
      }
      if(this.selectedSort.toString()=="Giá tăng"){
        this.common.getProductsSortPriceAsc('').then((data)=>{
          this.products=data;
        });
      }
      if(this.selectedSort.toString()=="Giá giảm"){
        this.common.getProductsSortPriceDesc('').then((data)=>{
          this.products=data;
        });
      }
  }
  // Search
  onSubmit(){
    console.log(this.searhTxt.value.name)
    this.common.searchProductsName(this.searhTxt.value.name).then((data)=>{
      this.products=data;
    }).catch((err)=>{
      console.log(err)
    })
  }

  // Nhảy đến trang chi tiết sản phẩm
  detail(product:any){
    console.log(product)
    this.route.navigate(['detail/',product.id])
  }
}
