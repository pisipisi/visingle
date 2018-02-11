import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AuthService} from "../../providers/auth-service";
import { HomePage} from '../home/home';
import { ExplorePage } from '../explore/explore';
import { RegisterPage } from '../register/register';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import * as $ from 'jquery';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  fbcon:any;
  logoLogin:any;
  lemail:any;
  lpass:any;
  logintext:any;
  isActive:boolean;
  recovertext:string;
  forgetBtn:boolean;
  loginBtn:boolean;
  master:any;
  response:any;
  recoverPassText:string;
  alreadyHasAccountText:string;
  recoverPassSucceed:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService, 
    public toastCtrl: ToastController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) {
    let config = JSON.parse(localStorage.getItem('config'));
    if(config.fb_app_id > 4){
      this.fbcon = true;
      this.fb.browserInit(config.fb_app_id, "v2.8");
    } else {
      this.fbcon = false;
    }
  }

  ionViewDidLoad() {
    let app = JSON.parse(localStorage.getItem('app'));
    this.logoLogin = app.logo_login;
    var lang = JSON.parse(localStorage.getItem('lang'));
    var alang = JSON.parse(localStorage.getItem('alang'));
    var tlang = JSON.parse(localStorage.getItem('tlang'));
    $('[data-alid]').each(function(){
      var id = $(this).attr('data-alid');
      $(this).text(alang[id].text);
    });
    $('[data-lid]').each(function(){
      var id = $(this).attr('data-lid');
      $(this).text(lang[id].text);
    });
    $('[data-tlid]').each(function(){
      var id = $(this).attr('data-tlid');
      $(this).text(tlang[id].text);
    });
    this.recoverPassText = lang[180].text;
    this.alreadyHasAccountText = alang[27].text;
    this.lemail = lang[28].text;
    this.lpass = lang[29].text;
    this.recoverPassSucceed = lang[341].text;
    this.logintext = lang[1].text;
    this.isActive = false;
    this.recovertext = alang[43].text;
    this.forgetBtn = false;
    this.loginBtn = false;

  }

  recoverPass() {
    this.forgetBtn = true;
    this.loginBtn = true;
  }

  backLogin() {
    this.forgetBtn = false;
    this.loginBtn = false;
  }
  
  passwordChange(pass) {
    if(pass.length > 4){
      this.isActive = true; 
    } else {
      this.isActive = false;
    }
  }
  send(email, pass) {
    if(pass.length < 4){
      return false;
    }		
    //this.master = Object.assign({}, user);
    this.loginBtn = true;
    let dID = localStorage.getItem('userHistory');
    try {
      this.authService.getData("action=login&login_email="+email+"&login_pass="+pass+"&dID="+dID).then((result)=> {
        this.response = result;
        if (this.response.error) {
          this.loginBtn = false;
          this.isActive = true;	
          this.presentToast(this.response.error_m);
        } else {
          localStorage.setItem('user', JSON.stringify(this.response.user));
          this.navCtrl.setRoot(ExplorePage);
        }
      });
    } catch (err) {
      this.presentToast('Something went wrong. Please try again later');
    }
  }
  changePage() {
		this.navCtrl.pop();
  };
  register() {
    this.navCtrl.push(RegisterPage);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  fbLogin() {
    let permissions = new Array<string>();
	  let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      env.fb.api("/me?fields=id,name,gender,email", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        let dID = localStorage.getItem('userHistory');
        let query = user.name.id+','+user.email+','+user.name+','+user.gender+','+dID;
        try {
          this.authService.getData("action=fbconnect&query="+query).then((result)=> {
            this.response = result;
            if (this.response.error) {
              this.loginBtn = false;
              this.isActive = true;	
              this.presentToast(this.response.error_m);
            } else {
              localStorage.setItem('user', JSON.stringify(this.response.user));
              env.nativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                picture: user.picture
              })
              .then(function(){
                env.navCtrl.setRoot(ExplorePage);
              }, function (error) {
                console.log(error);
              })
            }
          });
        } catch (err) {
          this.presentToast('Something went wrong. Please try again later');
        }			
        
      })
    }, function(error){
      console.log(error);
    });
  }
  forget(email) {	
    try {
      this.authService.getData("action=recover&query="+email).then((result)=> {
        this.response = result;
        if(this.response.error) {
          this.presentToast(this.response.error_m);
        } else {
          this.presentToast(this.recoverPassSucceed);
        }
      })
    } catch (err) {
      this.presentToast('Something went wrong. Please try again later');
    }
  }
  
  // fb() {
	// 	if (window.cordova) {
	// 		 $cordovaOauth.facebook(config.fb_app_id, ["email"]).then(function(result) {
	// 			$http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,name,email,gender", format: "json" }}).then(function(result) {
	// 				var dID = oneSignalID;
	// 				var query = result.data.id+','+result.data.email+','+result.data.name+','+result.data.gender+','+dID;
	// 			$scope.ajaxRequest = A.Query.get({action : 'fbconnect',query: query });
	// 			$scope.ajaxRequest.$promise.then(function(){							
	// 				$localstorage.setObject('user', $scope.ajaxRequest.user);
	// 				usPhotos = $scope.ajaxRequest.user.photos;
	// 				$state.go('home.explore');	
	// 			},
	// 			function(){
	// 				awlert.neutral('Something went wrong. Please try again later',3000);
	// 			});
				
	// 			}, function(error) {
	// 			alert("There was a problem getting your profile.  Check the logs for details.");
	// 				console.log(error);
	// 			});
	// 		 }, function(error) {
	// 			 alert("Auth Failed..!!"+error);
	// 		 });	
	// 		} else {
	// 			FB.getLoginStatus(function(response) {
	// 			    if (response.status === 'connected') {
	// 		            FB.api('/me', {
	// 		              	 fields: 'id,name,email,gender'
	// 		            }, function(response) {
	// 						var dID = oneSignalID;
	// 						var query = response.id+','+response.email+','+response.name+','+response.gender+','+dID;
	// 						$scope.ajaxRequest = A.Query.get({action : 'fbconnect',query: query });
	// 						$scope.ajaxRequest.$promise.then(function(){							
	// 							$localstorage.setObject('user', $scope.ajaxRequest.user);
	// 							usPhotos = $scope.ajaxRequest.user.photos;
	// 							$state.go('home.explore');	
	// 						},
	// 						function(){
	// 							awlert.neutral('Something went wrong. Please try again later',3000);
	// 						});		
	// 					});
	// 			    } else {
	// 					FB.login(function(response){
	// 						if(response.authResponse){
	// 				            FB.api('/me', {
	// 				                fields: 'id,name,email,gender'
	// 				            }, function(response) {
	// 								var dID = oneSignalID;
	// 								var query = response.id+','+response.email+','+response.name+','+response.gender+','+dID;
	// 								$scope.ajaxRequest = A.Query.get({action : 'fbconnect',query: query });
	// 								$scope.ajaxRequest.$promise.then(function(){							
	// 									$localstorage.setObject('user', $scope.ajaxRequest.user);
	// 									usPhotos = $scope.ajaxRequest.user.photos;
	// 									$state.go('home.explore');	
	// 								},
	// 								function(){
	// 									awlert.neutral('Something went wrong. Please try again later',3000);
	// 								});		
	// 							});
	// 						}
	// 					})	
	// 			    } 
	// 			});				
	// 		}		 
	// 	};
}
