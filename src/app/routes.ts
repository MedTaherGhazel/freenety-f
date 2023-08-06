import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignupClientComponent } from './signup-client/signup-client.component';
import { SignupFreelancerComponent } from './signup-freelancer/signup-freelancer.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Sign in'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up'
  },
  { path: 'signup-freelancer', component: SignupFreelancerComponent },
  { path: 'signup-client', component: SignupClientComponent },
];

export default routeConfig;
