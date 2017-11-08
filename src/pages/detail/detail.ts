import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  username:string

  slides = [
    {
      image:"assets/imgs/image1.png"
    },
    {
      image:"assets/imgs/image1.1.png"
    }
  ];

  constructor(public navCtrl: NavController,public navParams: NavParams) {
    
    this.username= this.navParams.get('showMsg');
  }
  
  buyProduct(){
    //buy product 
  }

  likeNum(){
    //collect like num
  }

}
