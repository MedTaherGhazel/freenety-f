import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SignupTalentComponent } from './signup-talent/signup-talent.component';
import { SignupClientComponent } from './signup-client/signup-client.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    SignupTalentComponent,
    SignupClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
