import { Component } from '@angular/core';
import { NavController , NavParams , AlertController} from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { UserData } from '../../providers/user-data';
import { Server } from '../../providers/server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username:string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public userData: UserData,
    public server:Server
  ) {
     this.server = server;
     this.server.getProduct();

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }
  
  imageClick(){
    if(this.username == undefined){
      let alert = this.alertCtrl.create({
        title:'Please Log in to see detail!',
        buttons:['OK']
      });
      alert.present();
    } else if(this.username === 'instantpot'){
        this.navCtrl.push(DetailPage,{
         showMsg:this.username
        });
    }
  }

}
