import { Component } from '@angular/core';

import {
  NavController,
  ActionSheetController,
  Platform } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';

import { AllergenData } from '../../providers/allergen-data';

import { CreateAllergenPage } from '../create-allergen/create-allergen';
import { AllergenDetailPage } from '../allergen-detail/allergen-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allergenList: any;

  constructor(public navCtrl: NavController, public allergenData: AllergenData,
    public actionCtrl: ActionSheetController, public platform: Platform,
    public authData: AuthData) {

    this.allergenList = this.allergenData.getAllergenList();
  }

  getIsUserSignedIn(allergenId): boolean {
    if (this.authData.getUser().isAnonymous == true){
      return false;
    } else {
    return true;
    }
  }

  createAllergen(): void { this.navCtrl.push(CreateAllergenPage); }

  goToAllergen(allergenId: string): void {
    this.navCtrl.push(AllergenDetailPage, { allergenId: allergenId });
  }

  moreAllergenOptions(allergenId){
    const action = this.actionCtrl.create({
      title: "More",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: !this.platform.is("ios") ? "trash" : null,
          handler: () => {
            this.allergenData.removeAllergen(allergenId);
          }
        },
        {
          text: "More details",
          icon: !this.platform.is("ios") ? "play" : null,
          handler: () => {
            this.navCtrl.push(AllergenDetailPage, { allergenId: allergenId });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => { console.log('Cancel clicked'); }
        }
      ]
    });
    action.present();
  }



}
