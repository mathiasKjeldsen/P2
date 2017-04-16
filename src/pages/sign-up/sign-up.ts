import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdditionalInfoPage } from '../additional-info/additional-info';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  constructor(public navCtrl: NavController) {

  }
backToPreviousPage() {
    this.navCtrl.pop();
}

signUp() {
    this.navCtrl.push(AdditionalInfoPage);
}

}
