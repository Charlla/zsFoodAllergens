import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';

import firebase from 'firebase';

@Injectable()
export class AllergenData {
  allergenList: FirebaseListObservable<any>;
  allergenDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    af.auth.subscribe( auth => {
      if (auth){
        this.allergenList = af.database.list(`/allergenList`);
        this.userId = auth.uid;
      }
    });
  }

  getAllergenList(): FirebaseListObservable<any> { return this.allergenList; }

  getAllergen(allergenId: string): FirebaseObjectObservable<any> {
    return this.allergenDetail = this.af.database
      .object(`/allergenList/${allergenId}`);
  }

  createAllergen(name: string, description: string){
    return this.allergenList.push({ name, description});
  }

  removeAllergen(allergenId: string): any { return this.allergenList.remove(allergenId); }

  takeAllergenPhoto(allergenId: string, imageURL: string): any {
    const storageRef = firebase.storage().ref(this.userId);
    return storageRef.child(allergenId).child('allergenPicture')
      .putString(imageURL, 'base64', {contentType: 'image/png'})
      .then( pictureSnapshot => {
        this.allergenList.update(allergenId, { picture: pictureSnapshot.downloadURL });
      });
  }



}
