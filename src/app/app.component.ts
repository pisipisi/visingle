import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//mport { HomePage } from '../pages/home/home';
//import { WelcomePage } from '../pages/welcome/welcome';
import { LoaderPage } from '../pages/loader/loader' ;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoaderPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    // var notificationOpenedCallback = function(jsonData) {
    //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    // };
  
    // window["plugins"].OneSignal
    //   .startInit("cb4f42fc-01b3-446d-b0fa-067128437370", "YOUR_GOOGLE_PROJECT_NUMBER_IF_ANDROID")
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .endInit();
   });
  }
}

