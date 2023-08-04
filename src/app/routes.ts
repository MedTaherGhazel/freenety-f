import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

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
];

export default routeConfig;
