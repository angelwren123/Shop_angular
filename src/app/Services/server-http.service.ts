import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Products } from '../models/products.model';
@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  private httpClient: HttpClient|any;
  private API_SEVER: string = 'https://fake-products-api-angular.herokuapp.com';
  private header:HttpHeaders | any;
  constructor(private injectable: Injector) {
    if (this.injectable) {
      this.httpClient = this.injectable.get(HttpClient);
      // this.header = new HttpHeaders().set('Content-Type', 'application/json' );
      // this.header = this.header.set('Authorization',
      // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicXVvYzEyMyIsInBhc3MiOiJxdW9jMTIzIiwiaWF0IjoxNjQ3NjU1MTUzLCJleHAiOjE2NDc2NTg3NTN9.ncnOdU--gzdurT292BBkZTXBLjSp0FQTq1myuR_Td0g');
    }
  }
  public get(path: string = '', param: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .get(this.API_SEVER + path, { params: param,headers:this.header })
          .subscribe((res: any) => resolve(res));
      } catch (error) {
        reject(error);
      }
    });
  }
  public post(path: string = '', body: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .post(this.API_SEVER + path, body, {headers:this.header  })
          .subscribe((res: any) => resolve(res));
      } catch (error) {
        reject(error);
      }
    });
  }

  public put(path: string = '', body: any) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .put(this.API_SEVER + path,body, {headers:this.header  })
          .subscribe((res: any) => resolve(res));
      } catch (error) {
        reject(error);
      }
    });
  }

  public delete(path: string = '') {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient
          .delete(this.API_SEVER + path, {headers:this.header  })
          .subscribe((res: any) => resolve(res));
      } catch (error) {
        reject(error);
      }
    });
  }


}
