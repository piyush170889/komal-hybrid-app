import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPass: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  updatePass() {

    console.log('updatePass ChangePassPage');

    if (this.oldPassword == '' || this.newPassword == '' || this.confirmNewPass == '') {
      this.commonUtility.presentErrorToast('Please Enter Valid Values');
    } else if (this.newPassword != this.confirmNewPass) {
      this.commonUtility.presentErrorToast('New Password And Confirm Password Does Not Match');
    } else {

      let udpatePasswordApiEndPoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CHANGE_PASS
        + ConstantsProvider.URL_SEPARATOR + this.commonUtility.getUserDetailsId();

      let updatePAsswordBody = {
        request: {
          oldPassWord: this.oldPassword,
          newPassword: this.newPassword
        }
      };

      this.restService.postDetails(udpatePasswordApiEndPoint, updatePAsswordBody)
        .subscribe(
          (response) => {
            console.log('Response = ' + JSON.stringify(response));
            this.commonUtility.presentToast('Password Updated Successfully', 5000);
            this.navCtrl.pop();
          }
        )
    }
  }
}
