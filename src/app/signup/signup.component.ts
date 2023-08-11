import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
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
        this.router.navigate(['/signup-talent']);
      } else if (this.selectedOption === 'client') {
        this.router.navigate(['/signup-client']);
      }
    }
}
