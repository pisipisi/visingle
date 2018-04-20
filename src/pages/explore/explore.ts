import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { MatchesPage } from '../matches/matches';
import { SettingsPage } from '../settings/settings';
import { AuthService } from "../../providers/auth-service";
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import 'rxjs/Rx';
/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  url:any;
  user:any;
  lang:any;
  alang:any;
  tlang:any;
  app:any;
  newChat:boolean;
  discoverChat:boolean;
  discoverSlike:boolean;
  matchModal:any;
  isMoveLeft:any;
  isMoveRight:any;
  cards=Array();
  stackConfig: StackConfig;
  recentCard: string = '';
  logo:any;
  ad1:boolean;
  loading:string;
  superLike:any;
  noSlike:any;
  slikephoto:any;
  cu:any;
  cu2:any;
  cu3:any;
  w:any;
  uphoto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public authService: AuthService, public toastCtrl: ToastController, private sanitizer: DomSanitizer) {
    this.url = 'explore';
    this.user = JSON.parse(localStorage.getItem('user')); 
    this.lang = JSON.parse(localStorage.getItem('lang'));
    this.alang = JSON.parse(localStorage.getItem('alang'));
    this.tlang = JSON.parse(localStorage.getItem('tlang'));
    this.app = JSON.parse(localStorage.getItem('app'));
    this.newChat = false;
    this.discoverChat = true;
    this.discoverSlike = true;
    this.uphoto = this.sanitizer.bypassSecurityTrustStyle(`url(${this.user.profile_photo})`);
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }
  ngAfterViewInit() {
    this.cards = [];
    try {		  
      this.authService.getData("action=game&id="+this.user.id).then((result)=> {
        let response:any = result;
        this.cards = response.game;			
        this.cu = this.cards[0].id;
        this.cu2 = this.cards[0];
        this._addCards(1);
      });
      // Either subscribe in controller or set in HTML
      this.swingStack.throwin.subscribe((event: DragEvent) => {
        event.target.style.background = '#ffffff';
      });
    } catch (err) {
        console.log("Error " + err);
    }
  }
  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    var leftText = element.querySelector('.no-text');
    var rightText = element.querySelector('.yes-text');
    var parentWidth = element.offsetWidth;
    var amt = (x/(parentWidth/2));
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
      if (leftText) leftText.style.opacity = this.fadeFn(-amt);
      if (rightText) rightText.style.opacity = 0;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
      if (leftText) leftText.style.opacity = 0;
      if (rightText) rightText.style.opacity = this.fadeFn(amt);
    }
    this.isMoveLeft = amt < -0.15;
    this.isMoveRight = amt > 0.15;  
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
  fadeFn(t) {
    // Speed up time to ramp up quickly
    t = Math.min(1, t * 3);

    // This is a simple cubic bezier curve.
    // http://cubic-bezier.com/#.11,.67,.41,.99
    var c1 = 0,
        c2 = 0.67,
        c3 = 0.41,
        c4 = 0.99;

    return Math.pow((1 - t), 3)*c1 + 3*Math.pow((1 -  t), 2)*t*c2 + 3*(1 - t)*t*t*c3 + Math.pow(t, 3)*c4;
  }
  // Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.isMoveLeft = false;
    this.isMoveRight = false;
  //  this._addCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.email;
      if (removedCard.isFan == 1) {
        this.openMatchModal();
        var w = window.innerWidth;
        w = w/3;
        this.alang.forEach(function(entry) {					  
          this.alang.push({
            id: entry,
            text: entry.text
          })
        })	 
      }
    } else {
      this.recentCard = 'You disliked: ' + removedCard.email;
    }
  }
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    
    return hex;
  }
  ionViewDidLoad() {
    if(this.app.ads){
      this.ad1 = true;
      setTimeout(function(){
         this.ads = this.app.ads;
      },1050);	
    } else {
      this.ad1 = false;
    }
    this.logo = this.app.logo;
  
    // //load chat
    // try {
    //   this.authService.getData("action=getChat&id="+this.user.id).then((result)=> {
    //     let response:any = result;
    //     this.matches = response.matches;
    //     this.unread = response.unread;
    //     this.chats = this.matches;
    //     if(this.unread != null){
    //       this.unrread = this.unread.length;
    //       this.unread = this.unread.length;
    //     }
    //   });
    // } catch (err) {
    //   console.log("Error " + err);
    // }


    var w = window.innerWidth;
    w = w/2;
    if(w > 200){
      w = 200;
    }
    this.w = w;
    // s_age = user.sage;
    // user_country = user.country;
    // user_city = user.city;	
    this.superLike = this.user.slike;
    this.loading = this.alang[8].text;
   // this.cards = [];
    

  
      
  
      // Match popup
      // $ionicModal.fromTemplateUrl('templates/modals/match.html', {
      //   scope: $scope,
      //   animation: 'slide-in-up'
      // }).then(function(modal) {
      //   this.matchModal = modal;
      // });

  }
  // trustSrc(src) {
  //   return $sce.trustAsResourceUrl(src);
  // }

  changePage(url,slide,val) {
  //  Navigation.goNative(url, val, slide);  
  };
  gameAction(id,action) {
    var _that = this;
    try {
      this.authService.getData("action=game_like&uid1="+this.user.id+"&uid2="+id+"&uid3="+action).then((result)=> {
      },
      function(){ 
        this.loading = _that.alang[7].text; 
      //awlert.neutral('Nothing found, try choosing a new location.', 3000);
      });
    } catch (err) {
      console.log("Error " + err);
    }	
  }
  goToChat(){
    this.navCtrl.push(MatchesPage, {}, {direction:'back'});
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage, {}, {direction:'forward'})	
  }	

  _addCards(quantity) {
    for (var i = 0; i < Math.min(this.cards.length, quantity); i++) {
      this.cards.push(this.cards[0]);
      this.cards.splice(0, 1);
    }
  }
  cardDestroyed(index,act) {
    if(act == 1){
      if (this.cards[index].isFan == 1){
        this.openMatchModal();
        var w = window.innerWidth;
        w = w/3;
     //   this.width = w;
        this.cu3 = this.cards[index];
     //   this.myPhoto = this.user.profile_photo;
        this.alang.forEach(function(entry) {					  
          this.alang.push({
            id: entry,
            text: entry.text
          })
        })	 
      }
    }
    this.cards.splice(index, 1);
    this._addCards(1);
    this.cu = this.cards[index].id;
    this.cu2 = this.cards[index];
    this.isMoveLeft = false;
    this.isMoveRight = false;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  cardSwiped(index) {
    this.cards.splice(index, 1);
  };
  like(){
    this.gameAction(this.cu,1);
  }
  slike(){
    if(this.cards.length > 0){
      if(this.superLike > 0){
        this.presentToast(this.alang[9].text);
        var int = parseInt(this.superLike);
        this.superLike = int-1;	 
     //   sape = sape-1;
        this.gameAction(this.cu,3);	
        this.cardDestroyed(0,1);
      } else {
        this.slikephoto = this.cu2.photo;
        this.noSlike = true;
      }
    }
  }	
  buySlike(){
    this.user.credits = parseInt(this.user.credits);
    if(400 > this.user.credits){
      this.openCreditsModal();
    } else {
      this.noSlike = false;
      var ma = this.user.id + ',400,10';
      this.presentToast(this.alang[9].text);	  
      this.gameAction(this.cu,3);
      this.cardDestroyed(0,1);		
      try {
        this.authService.getData("action=slike&query="+ma).then((result)=> {
          let response:any = result;
          localStorage.setItem('user',response.user);
          this.superLike = this.user.slike;
          var int = parseInt(this.superLike);
          this.superLike = int-1;
      //    sape = this.user.slike;
      //    sape = sape-1;	
        });
      } catch (err) {
        console.log("Error " + err);
      }	
    }
  };	
  noBtnSlike = function(){
    this.noSlike = false;			
  }	
  
  nolike(){
    this.gameAction(this.cu,0);				
  }	
  // For reasons, the cardSwipedRight and cardSwipedLeft events don’t get called always
  // https://devdactic.com/optimize-tinder-cards/
  cardSwipedLeft(event, index) {
    this.gameAction(this.cards[index].id,0);		
    event.stopPropagation();
  }

  cardSwipedRight(event, index) {	
    this.gameAction(this.cards[index].id,1);
      event.stopPropagation();
      //if ($scope.cards[index].isFan == 1){$scope.openMatchModal()};
    }

  cardPartialSwipe(amt) {
    this.isMoveLeft = amt < -0.15;
    this.isMoveRight = amt > 0.15;  
  }

  openMatchModal() {
  //  this.matchModal.show();
  }
  closeMatchModal() {
  //  this.matchModal.hide();
  };
  
  openCreditsModal() {
   // const profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
  //  profileModal.present();
  }

  trustSrc(src) {
		return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${src})`);
  }  
}
