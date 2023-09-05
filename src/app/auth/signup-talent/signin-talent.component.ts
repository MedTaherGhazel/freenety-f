import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-talent',
  templateUrl: './signin-talent.component.html',
  styleUrls: ['./signin-talent.component.scss']
})
export class SigninTalentComponent {
  onLoading=false;
  isLoading = false;
  constructor() {}
  onSignup(form:NgForm){

  }
}
