import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoaderPage } from '../pages/loader/loader';
import { AuthService } from '../providers/auth-service';
import { HttpModule } from "@angular/http";
import { SwingModule } from 'angular2-swing';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Register2Page } from '../pages/register2/register2';
import { Register3Page } from '../pages/register3/register3';
import { ExplorePage } from '../pages/explore/explore';
import { MatchesPage } from '../pages/matches/matches';
import { SettingsPage } from '../pages/settings/settings';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage, 
    LoaderPage,
    LoginPage,
    RegisterPage,
    Register2Page,
    Register3Page,
    ExplorePage,
    MatchesPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoaderPage,
    LoginPage,
    RegisterPage,
    Register2Page,
    Register3Page,
    ExplorePage,
    MatchesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    AuthService, 
    Camera, 
    File,
    Transfer,
    FilePath,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
