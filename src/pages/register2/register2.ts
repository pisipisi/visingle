import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AuthService} from "../../providers/auth-service";
import * as $ from 'jquery';
/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  isActive:boolean;
  regBtn:boolean;
  girl:boolean;
  boy:boolean;
  lang:any;
  alang:any;
  tlang:any;
  nexttext:string;
  looking:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public authService: AuthService) {
  }

  ionViewDidLoad() {
    this.looking = 2;									
    this.isActive = true;
    this.regBtn = false;
    this.girl = true;
    this.boy = false;
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
    this.nexttext = this.alang[26].text;
  }
  selectGirl(){
    if(this.girl){
      this.girl = false;
      this.looking = this.looking-2;
      if(this.looking == 0){
        this.isActive = false;	
      }
    } else {
      this.girl = true;	
      this.isActive = true;
      this.looking = this.looking+2;
    }
  }

  selectBoy(){
    if(this.boy){
      this.boy = false;
      this.looking = this.looking-1;
      if(this.looking == 0){
        this.isActive = false;	
      }			
    } else {
      this.boy = true;	
      this.isActive = true;
      this.looking = this.looking+1;
    }
  }	
  changePage() {
		this.navCtrl.pop();
  };
  send() {
    this.regBtn = true;
    let dID = localStorage.getItem('userHistory');
    let reg_photo = this.authService.site_url+'assets/sources/uploads/'+dID+'.jpg';
    try {
      this.authService.getData("action=register&reg_name="+this.navParams.get('name')+"&reg_email="+this.navParams.get('email')+"&reg_pass="+this.navParams.get('password')+"&reg_gender="+this.navParams.get('gender')+"&reg_birthday="+this.navParams.get('birthday')+"&reg_looking="+this.looking+"&reg_photo="+reg_photo+"&dID="+dID).then((result)=> {
        let response:any = result;
        if (response.error) {
          this.regBtn = false;
          this.isActive = true;
          this.presentToast(response.error_m);
        } else {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.navCtrl.setRoot(HomePage);
        }
      });
    } catch (err) {
      this.presentToast('Something went wrong. Please try again later');
    }
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
}
