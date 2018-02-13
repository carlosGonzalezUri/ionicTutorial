import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Geolocation } from '@ionic-native/geolocation';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';



export const firebaseConfig = {
    apiKey: "AIzaSyBioACxUYRlLQuSgJJ_sMViYEbk5Ce_akI",
    authDomain: "ionic-con-firebase.firebaseapp.com",
    databaseURL: "https://ionic-con-firebase.firebaseio.com",
    projectId: "ionic-con-firebase",
    storageBucket: "ionic-con-firebase.appspot.com",
    messagingSenderId: "501899212197"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'demo104'),
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    UniqueDeviceID
  ]
})
export class AppModule {}


