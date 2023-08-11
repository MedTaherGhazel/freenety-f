import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SignupTalentComponent } from './signup-talent/signup-talent.component';
import { SignupClientComponent } from './signup-client/signup-client.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,title: 'Home page'},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-talent', component:SignupTalentComponent},
  { path: 'signup-client', component:SignupClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
