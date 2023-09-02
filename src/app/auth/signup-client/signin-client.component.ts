import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signin-client.component.html',
  styleUrls: ['./signin-client.component.scss']
})
export class SigninClientComponent {
  isLoading = false;
  constructor(public authService:AuthService) {}
  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email,form.value.password);
    console.log("eeeeeeeeeee")
  }
}
