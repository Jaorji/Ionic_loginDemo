import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Server{
  public data: any;

  constructor(private http:Http){
    this.http = http;
  }

  getProduct(){
    this.http.get("http://localhost:8080/db.json")
      .subscribe(res => {
        this.data = res.json();
      },error => {
        console.log(error);
      });
  }
}