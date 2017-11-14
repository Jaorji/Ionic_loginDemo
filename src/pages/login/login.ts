import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Validators , FormBuilder , FormGroup } from '@angular/forms';
import { NavController , AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ForgetUserName } from '../forget_username/forget_username';
import { ForgetPassword } from '../forget_password/forget_password';
import { TranslateService } from 'ng2-translate';
import { UserData } from '../../providers/user-data';
import { Server } from '../../providers/server';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private todo: FormGroup;

  constructor(
    public navCtrl : NavController ,
    private formBuilder : FormBuilder, 
    private alertCtrl : AlertController,
    public translate:TranslateService,
    public userData:UserData,
    public http:Http,
    public server:Server
  ){
    translate.setDefaultLang('common');
    translate.use('common');
    this.todo = this.formBuilder.group({
      username:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(20)])],
      password:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(20)])],
      login_checkBox:false,
    });
  }

  loginForm(){
    let data:any;
    let username = this.todo.controls['username'];
    let password = this.todo.controls['password'];
    
    this.http.post("http://127.0.0.1:8182",username.value+","+password.value)
      .subscribe(res =>{
        data = res["_body"];
        if(data==="login success"){
          this.userData.login(username.value,password.value);
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.popToRoot();
        }else{
           let alert = this.alertCtrl.create({
           title:'Wrong user name or Password!',
           buttons:['OK']
      });
        alert.present();
        }
      });

      //store cache username and password in web
      let login_checkBox = this.todo.controls['login_checkBox'];
  }

  updatgeCheckBox(){
    console.log(this.todo.controls['login_checkBox'].value);
  }

  forgetUserNameEvent(){
    this.navCtrl.push(ForgetUserName);
  }

  forgetPasswordEvent(){
    this.navCtrl.push(ForgetPassword,{
      username:this.todo.controls['username'].value
    });
  }

  signupForm(){
    console.log("Sign up request!");
  }
}