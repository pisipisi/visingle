import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { ExplorePage } from '../explore/explore';
/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {
  public oneSignalID: any;
  resposeData : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    var mobileUser = localStorage.getItem('userHistory');
    localStorage.setItem('site_url', this.authService.site_url);
    if (mobileUser == null) {
      this.oneSignalID = Math.floor((Math.random() * 93199999) + 1);
      localStorage.setItem('userHistory', this.oneSignalID);
    } else {
      this.oneSignalID = localStorage.getItem('userHistory');
    }
    try {
      this.authService.getData("action=config&dID="+this.oneSignalID).then((result)=> {
        this.resposeData = result;
        if(this.resposeData){
          localStorage.setItem('config',JSON.stringify(this.resposeData.config));
          localStorage.setItem('app', JSON.stringify(this.resposeData.app));
          localStorage.setItem('prices', JSON.stringify(this.resposeData.prices));
          var l1 = this.resposeData.lang;
          var l2 = this.resposeData.alang;
          var l3 = this.resposeData.tlang;
          l1.forEach(function(entry) {					  
            l1[entry.id].text = entry.text.replace("&#039;", "'");	
          });	
          l2.forEach(function(entry) {					  
            l2[entry.id].text = entry.text.replace("&#039;", "'");		
          });	
          l3.forEach(function(entry) {					  
            l3[entry.id].text = entry.text.replace("&#039;", "'");		
          });
          localStorage.setItem('lang', JSON.stringify(l1));
          localStorage.setItem('alang', JSON.stringify(l2));
          localStorage.setItem('tlang', JSON.stringify(l3));
  
          localStorage.setItem('user', JSON.stringify(this.resposeData.user));
          localStorage.setItem('premium_package', JSON.stringify(this.resposeData.premium_package));
          localStorage.setItem('credits_package', JSON.stringify(this.resposeData.credits_package));					
          localStorage.setItem('account_basic', JSON.stringify(this.resposeData.account_basic));
          localStorage.setItem('account_premium', JSON.stringify(this.resposeData.account_premium));
          localStorage.setItem('gifts', JSON.stringify(this.resposeData.gifts));
          if(this.resposeData.user != ''){  
            this.navCtrl.setRoot(ExplorePage);
            localStorage.setItem('usPhotos', JSON.stringify(this.resposeData.user.photos));
          } else {
            this.navCtrl.setRoot(WelcomePage);
          }			
          var style = document.createElement('style');
          style.type = 'text/css';
          var app = JSON.parse(localStorage.getItem('app'));
          style.innerHTML = '.bg-tinder {background:'+app.first_color+'; background: -moz-linear-gradient(left,  '+app.first_color+' 0%, '+app.second_color+' 100%);background: -webkit-linear-gradient(left,  '+app.first_color+' 0%,'+app.second_color+' 100%); background: linear-gradient(to right,  '+app.first_color+' 0%,'+app.second_color+' 100%); color:#fff }';
          document.getElementsByTagName('head')[0].appendChild(style);
        }
      })
    } catch (err) {
      console.log("Error " + err);
    }
  }

  ionViewDidLoad() {
    
  }
}
