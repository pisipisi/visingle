import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import * as $ from 'jquery';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  lang19:any;
  lang20:any;
  lang21:any;
  site_url:any;
  mySlideOptions = {
    pager:true
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.site_url = localStorage.getItem('site_url');		
  }

  ionViewDidLoad() {	
    					  
    var alang = JSON.parse(localStorage.getItem('alang'));
    $('[data-alid]').each(function(){
      var id = $(this).attr('data-alid');
      $(this).text(alang[id].text); 
    });
    this.lang19 = alang[19].text;
    this.lang20 = alang[20].text;
    this.lang21 = alang[21].text;
  }
  changePage(url,slide,val) {
    this.navCtrl.push(LoginPage,{}, { animate: true, direction: 'forward' });
  }
}
