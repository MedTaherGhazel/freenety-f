import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h1>Freenety</h1>
     <div class="wrapper">
  <div class="rec-prism">
    <div class="face face-front">
      <div class="content">
        <h1>Sign in</h1>
        <form onsubmit="event.preventDefault()">
          <div class="field-wrapper">
            <input type="text" name="username" placeholder="username">
            <label>username</label>
          </div>
          <div class="field-wrapper">
            <input type="password" name="password" placeholder="password" autocomplete="new-password">
            <label>password</label>
          </div>
          <div class="field-wrapper">
            <input type="submit" onclick="showThankYou()">
          </div>
          <span class="psw" onclick="showForgotPassword()">Forgot Password?   </span>
          <span class="signup" onclick="showSignup()">Not a user?  Sign up</span>
        </form>
      </div>
    </div>
    </div>
  </div>
  `,
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

}
