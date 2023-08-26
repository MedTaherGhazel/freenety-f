import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  selectedOption: string = '';
  createAccountButtonText: string = 'select your role';
  constructor(private router: Router) {}

  onSelectionChange(event: any) {
    this.selectedOption = event.target.id;
    this.createAccountButtonText = `Create account as ${this.selectedOption}`;
  }
    onFreelancerSelected() {
      this.selectedOption = 'freelancer';
    }

    onClientSelected() {
      this.selectedOption = 'client';
    }

    redirectToSignup() {
      if (this.selectedOption === 'freelancer') {
        this.router.navigate(['/signin-talent']);
      } else if (this.selectedOption === 'client') {
        this.router.navigate(['/signin-client']);
      }
    }
}
