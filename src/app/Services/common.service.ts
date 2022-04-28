import { Injectable, Injector } from '@angular/core';
import { Products } from '../models/products.model';
import { ServerHttpService } from './server-http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends ServerHttpService {
  constructor(inject:Injector) {
    super(inject)
   }

  //  Trả về toàn bộ sản phẩm
  getProducts(param: any){
    return this.get('/products',param);
    // return this.get('/products/?_sort=name&_order=asc',param);
  }
  // Tìm kiếm
  searchProductsName(param:any){
    return this.get('/products?name_like='+param,'')
  }
  //   Sắp xếp theo theo name A-Z
  getProductsSortNameAsc(param:any){
    return this.get('/products/?_sort=name&_order=asc',param);
  }
  //   Sắp xếp theo theo name Z-A
  getProductsSortNameDesc(param:any){
    return this.get('/products/?_sort=name&_order=desc',param);
  }
  // Sắp xếp theo giá tăng
  getProductsSortPriceAsc(param:any){
    return this.get('/products/?_sort=price&_order=asc',param);
  }
  // sắp theo giá giảm
  getProductsSortPriceDesc(param:any){
    return this.get('/products/?_sort=price&_order=desc',param);
  }
  //  Trả về 1 sản phẩm
  getAProduct(id: number){
    return this.get(`/products/${id}`,"");
  }
  // thêm
  postProduct(data: any){
    return this.post('/products',data);
  }
  //cập nhật
  putProduct(id:number,data: any){
    return this.put(`/products/${id}`,data);
  }
  //delete
  deleteProduct(id: number){
    return this.delete('/products/'+id);
  }
  //Trả về admin
  getAdmin(param:any){
    return this.get('/admin/',param);
  }
  //
  getUser(param:any){
    return this.get('/users/',param);
  }

  // đăng kí
  postUser(data: any){
    return this.post('/users/',data);
  }
}
