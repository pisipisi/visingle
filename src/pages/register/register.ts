import { Component } from '@angular/core';
import {Camera } from '@ionic-native/camera';
//import { File } from '@ionic-native/file';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
//import { FilePath } from '@ionic-native/file-path';
import { IonicPage, 
  NavController, 
  NavParams, 
//  AlertController, 
  Platform, 
  ActionSheetController, 
  ToastController, 
//  LoadingController, 
  Loading 
} from 'ionic-angular';

import {AuthService} from "../../providers/auth-service";

import { Register3Page } from '../register3/register3';
import * as $ from 'jquery';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  lname:string;
  lemail:string;
  lpass:string;
  nexttext:string;
  regPhoto:string;
  alreadyHas:string;
  loginTxt:string;
  isActive:boolean;
  regBtn:boolean;
  con:boolean;
  lang:any;
  alang:any;
  tlang:any;
  lastImage: string = null;
  loading: Loading;
  imageURI:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService, 
  //  private alertController: AlertController, 
    public platform: Platform,
  //  private transfer: Transfer, 
  //  private file: File, 
  //  private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
  //  public loadingCtrl: LoadingController,
    private camera: Camera) {
  }

  ionViewDidLoad() {								   
   // var app = JSON.parse(localStorage.getItem('app')); 
    this.lang = JSON.parse(localStorage.getItem('lang'));
    this.alang = JSON.parse(localStorage.getItem('alang'));
    this.tlang = JSON.parse(localStorage.getItem('tlang'));
    // $('[data-alid]').each(function(){
    //   var id = $(this).attr('data-alid');
    //   $(this).text(alang[id].text);
    // });
    // $('[data-lid]').each(function(){
    //   var id = $(this).attr('data-lid');
    //   $(this).text(lang[id].text);
    // });
    // $('[data-tlid]').each(function(){
    //   var id = $(this).attr('data-tlid');
    //   $(this).text(tlang[id].text);
    // });
    this.lname = this.lang[26].text;
    this.lemail = this.lang[28].text;
    this.lpass = this.lang[29].text;
    this.nexttext = this.alang[26].text;
    this.alreadyHas = this.alang[27].text;
    this.loginTxt = this.lang[1].text;
    this.regPhoto = '';
    let w = document.getElementById('photo-upload').offsetWidth; 
    $('#photo-upload').css('height',w+'px');
    this.isActive = false;
    this.regBtn = false;
    //var regPhoto = '';
    this.con = false;
  }
  passwordChange(pass) {
    if(pass.length > 4){
      this.isActive = true; 
    } else {
      this.isActive = false;
    }
  }
  
  backToLogin() {
    this.navCtrl.pop();
  }
  validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
  }
  
  next(reg_name, reg_email, reg_pass) {
    if(reg_pass.length < 4){
			return false;
		}
		if(this.con == false){
      this.presentToast(this.alang[3].text);
			return false;
		}		
		if(reg_name == ''){
      this.presentToast(this.alang[4].text);		
			return false;
		}
		if(reg_email == ''){
      this.presentToast(this.alang[4].text);
			return false;
		}
		if (!this.validateEmail(reg_email)) {		
			this.presentToast(this.alang[5].text);
			return false;		
		}
		if(reg_pass == ''){
			this.presentToast(this.alang[4].text);
			return false;
		}
	//	var reg = reg_name+'  '+reg_email+'  '+reg_pass;
	//	localStorage.setItem('register',reg);
		this.navCtrl.push(Register3Page, {name: reg_name,email: reg_email, password: reg_pass});
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      var image = "data:image/jpeg;base64," + imagePath;
      $('#photo-upload').css('background-image','url('+image+')');
      $('#photo-upload ion-icon').hide();
      this.imageURI = image;
      this.uploadImageBase64();
      // // Special handling for Android library
      // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      //   this.filePath.resolveNativePath(imagePath)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      //     });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  //   // Create a new name for the image
  // private createFileName() {
  //   var d = new Date(),
  //   n = d.getTime(),
  //   newFileName =  n + ".jpg";
  //   return newFileName;
  // }
  
  // // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName) {
  //   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  //     this.lastImage = newFileName;
  //   }, error => {
  //     this.presentToast('Error while storing file.');
  //   });
  // }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImageBase64() {
    var dID = localStorage.getItem('userHistory');
    var site_url = this.authService.site_url;
    this.con = true;
    $.ajax({
      url: site_url+'assets/sources/appupload.php',
      data:{
        action: 'register',
        base64: this.imageURI,
        uid: dID
      },
      cache: false,
      contentType: "application/x-www-form-urlencoded",				  
      type:"post",
      success:function(){
      }
    });
  }
  // public uploadImage() {
  //   // Destination URL
  //   var url = this.authService.site_url+'assets/sources/appupload.php';
  
  //   // File for Upload
  //   var targetPath = this.pathForImage(this.lastImage);
  
  //   // File name only
  //   var filename = this.lastImage;
  
  //   var options = {
  //     fileKey: "file",
  //     fileName: filename,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params : {'fileName': filename}
  //   };
  
  //   const fileTransfer: TransferObject = this.transfer.create();
  
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Uploading...',
  //   });
  //   this.loading.present();
  
  //   // Use the FileTransfer to upload the image
  //   fileTransfer.upload(targetPath, url, options).then(data => {
  //     this.loading.dismissAll()
  //     this.presentToast('Image succesful uploaded.');
  //   }, err => {
  //     this.loading.dismissAll()
  //     this.presentToast('Error while uploading file.');
  //   });
  // }
  // pick() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }
    
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageURI = imageData;
  //     var image = "data:image/jpeg;base64," + imageData;
  //     $('#photo-upload').css('background-image','url('+image+')');
  //     $('#photo-upload ion-icon').hide();
  //     console.log('dfgd');
  //   }, (err) => {
  //     console.log(err);
  //     this.presentToast(err);
  //   });
    
  //   // if (this.platform.is('cordova')) {
  //   //   var options = {
  //   //     quality: 40,
  //   //     destinationType: this.camera.DestinationType.DATA_URL,
  //   //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   //     encodingType: this.camera.EncodingType.JPEG,
  //   //     allowEdit : true,
  //   //   }
  //   //   this.camera.getPicture(options).then(function(imageData) {
  //   //     var image = "data:image/jpeg;base64," + imageData;
  //   //     var dID = localStorage.getItem('userHistory');
  //   //     var site_url = this.authService.site_url;
  //   //     var reg_photo = site_url+'assets/sources/uploads/'+dID+'.jpg';
  //   //     var div = $('#photo-upload'); 
  //   //     div.css('background-image','url('+image+')');
  //   //     $('#photo-upload i').hide();
  //   //     //con = true;
  //   //     $.ajax({
  //   //       url: site_url+'assets/sources/appupload.php',
  //   //       data:{
  //   //         action: 'register',
  //   //         base64: image,
  //   //         uid: dID
  //   //       },
  //   //       cache: false,
  //   //       contentType: "application/x-www-form-urlencoded",				  
  //   //       type:"post",
  //   //       success:function(){
  //   //       }
  //   //     });
  //   //   }, function(err) {
  //   //     // error
  //   //   });
  //   // } else {
  //   //   $('#uploadRegPhoto').click();
  //   // }
  // } 
}
