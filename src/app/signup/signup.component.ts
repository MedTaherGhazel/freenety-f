import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  template: `
<a href=""><h1>Freenety</h1></a><br>
<h1>Are you Freenetix or Freeneter ?</h1>
<div class="cards">
  <label class="card">
    <input name="plan" class="radio" type="radio" id="client" (change)="onSelectionChange($event)">
    <img src="../../assets/images/client.png" alt="..." class="card-img-top">
    <div class="card-body">
      <h2 class="card-title">I'm client, hiring for a project</h2>
    </div>
  </label>
  <label class="card">
    <input name="plan" class="radio" type="radio" id="freelancer" (change)="onSelectionChange($event)">
    <img src="../../assets/images/freelancer.png" alt="..." class="card-img-top">
    <div class="card-body">
      <h2 class="card-title">I'm a freelancer, looking for work</h2>
    </div>
  </label>
  <div class="field-wrapper">
    <button>{{ createAccountButtonText }}</button>
  </div>
</div>

  `,
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  selectedOption: string = 'freelancer';
  createAccountButtonText: string = 'Create account as freelancer';

  onSelectionChange(event: any) {
    this.selectedOption = event.target.id;
    this.createAccountButtonText = `Create account as ${this.selectedOption}`;
  }
}
