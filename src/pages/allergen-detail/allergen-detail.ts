import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController } from 'ionic-angular';
import { AllergenData } from '../../providers/allergen-data';
import { AuthData } from '../../providers/auth-data';
import { Camera } from '@ionic-native/camera'
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-allergen-detail',
  templateUrl: 'allergen-detail.html'
})
export class AllergenDetailPage {
  public allergen: any;
  public placeholderPicture: string = "assets/img/logo.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public actionCtrl: ActionSheetController,
    public allergenData: AllergenData, public alertCtrl: AlertController,
    public authData: AuthData) {

      this.allergenData.getAllergen(this.navParams.get("allergenId"))
        .subscribe( allergenSnap => { this.allergen = allergenSnap });
    }

  showOptions(allergenId): void{
    const action = this.actionCtrl.create({
      title: 'Modify the allergen',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.allergenData.removeAllergen(allergenId)
              .then( () => { this.navCtrl.pop(); });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

  uploadPicture(allergenId): void {
    if (this.authData.getUser().isAnonymous == true){
      const alert = this.alertCtrl.create({
        message: `If you want to continue you'll need to
        provide an email and create a password`,
        buttons: [
          { text: "Cancel" },
          {
            text: "OK",
            handler: data => {
              this.navCtrl.push(SignupPage);
            }
          }
        ]
      });
      alert.present();
    } else {
      Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.allergenData.takeAllergenPhoto(allergenId, imageData);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
    }
  }

}
