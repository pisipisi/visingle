import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Register2Page} from '../register2/register2';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';
/**
 * Generated class for the Register3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register3',
  templateUrl: 'register3.html',
})
export class Register3Page {
  lang:any;
  alang:any;
  tlang:any;
  lang31:string;
  nexttext:string;
  isActive:boolean;
  regBtn:boolean;
  girl:boolean
  boy:boolean;
  name:any;
  gender:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.gender = 0;
    //var reg = JSON.parse(localStorage.getItem('register'));
    this.lang = JSON.parse(localStorage.getItem('lang'));
    this.alang = JSON.parse(localStorage.getItem('alang'));
    this.tlang = JSON.parse(localStorage.getItem('tlang'));
    let _that = this;
    $('[data-alid]').each(function(){
      var id = $(this).attr('data-alid');
      $(this).text(_that.alang[id].text);
    });
    $('[data-lid]').each(function(){
      var id = $(this).attr('data-lid');
      $(this).text(_that.lang[id].text);
    });
    $('[data-tlid]').each(function(){
      var id = $(this).attr('data-tlid');
      $(this).text(_that.tlang[id].text);
    });
    this.lang31 = this.alang[31].text;
    this.nexttext = this.alang[26].text;
    
    this.isActive = false;
    this.regBtn = false;
    this.girl = false;
    this.boy = false;
    this.name = this.navParams.get('name');
  }
  selectGirl(){
    if(this.boy){
      this.boy = false;
      this.isActive = false;			
    }
    if(this.girl){
      this.girl = false;
      this.isActive = false;	
    } else {
      this.girl = true;	
      this.isActive = true;
      this.gender = 2;
    }
  }
  selectBoy(){
    if(this.girl){
      this.girl = false;
      this.isActive = false;	
    }		
    if(this.boy){
      this.boy = false;
      this.isActive = false;			
    } else {
      this.boy = true;	
      this.isActive = true;
      this.gender = 1;
    }
  }	
  send(reg_birth) {
    if(reg_birth == ''){	
      this.presentToast(this.alang[6].text);
      return false;
    }
    var regData = {
      name:this.navParams.get('name'),
      email: this.navParams.get('email'),
      password: this.navParams.get('password'), 
      gender: this.gender,
      birthday: reg_birth
    };
    this.navCtrl.push(Register2Page, regData);
    
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  backToLogin() {
    this.navCtrl.popTo(LoginPage);
  }
  changePage() {
		this.navCtrl.pop();
  };
}
