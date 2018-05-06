import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyDrEgCdYbjfwBLNaSEj7nkWyTQkbG46ZMA",
  authDomain: "theme-app-b9976.firebaseapp.com",
  databaseURL: "https://theme-app-b9976.firebaseio.com",
  projectId: "theme-app-b9976",
  storageBucket: "theme-app-b9976.appspot.com",
  messagingSenderId: "954373264927"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;


  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      firebase.initializeApp(firebaseConfig);
    });
  }
}

