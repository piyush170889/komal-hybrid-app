import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendOtpPage } from './send-otp';

@NgModule({
  declarations: [
    SendOtpPage,
  ],
  imports: [
    IonicPageModule.forChild(SendOtpPage),
  ],
})
export class SendOtpPageModule {}
