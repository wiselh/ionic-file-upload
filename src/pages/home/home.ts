import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  captureDataUrl: string;
  alertCtrl: AlertController;

  @Input('useURI') useURI: Boolean = true;

  constructor(public navCtrl: NavController, private camera: Camera, alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }
  getPicture(sourceType) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
      }, (err) => {
        console.log(err);
      });
  }

  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();
      });
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }

}
