import { Component } from '@angular/core';
import { Validators , FormBuilder , FormGroup } from '@angular/forms';
import { NavController , AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ForgetUserName } from '../forget_username/forget_username';
import { ForgetPassword } from '../forget_password/forget_password';
import { TranslateService } from 'ng2-translate';
import { UserData } from '../../providers/user-data';

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

    let username = this.todo.controls['username'];
    let password = this.todo.controls['password'];

    if(username.value === "instantpot"&&password.value==="12345"){
      this.userData.login(username.value,password.value);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }else if(username.value === "instantpot"&&password.value!="12345"){
        let alert = this.alertCtrl.create({
         title:'Wrong Password!',
         subTitle:'The password should contain 5-20 characters',
         buttons:['OK']
      });
        alert.present();
    }else if(username.value != "instantpot"&&password.value==="12345"){
      let alert = this.alertCtrl.create({
         title:'Wrong user name!',
         subTitle:'The user name should contain 5-20 characters',
         buttons:['OK']
      });
        alert.present();
    }else{
      let alert = this.alertCtrl.create({
         title:'Wrong user name and Password!',
         buttons:['OK']
      });
        alert.present();
    }
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