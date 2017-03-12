import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AllergenData } from '../../providers/allergen-data';

@Component({
  selector: 'page-create-allergen',
  templateUrl: 'create-allergen.html',
})
export class CreateAllergenPage {
  public newAllergenForm;

  constructor(public navCtrl: NavController, public allergenData: AllergenData,
    public formBuilder: FormBuilder) {

    this.newAllergenForm = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createAllergen(){
    if (!this.newAllergenForm.valid){
      console.log(this.newAllergenForm.value);
    } else {
      this.allergenData.createAllergen(this.newAllergenForm.value.name,
        this.newAllergenForm.value.description)
        .then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });

    }
  }

}
