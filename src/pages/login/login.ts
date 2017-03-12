import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

// Import modules for Form validation
import { FormBuilder, Validators } from '@angular/forms';

// Import the Authentication provider.
import { AuthData } from '../../providers/auth-data';

// Import the pages.
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;
  loading: any;
  
  constructor(public navCtrl: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), 
          Validators.required])]
      });
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password).then( () => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(HomePage);
          });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
