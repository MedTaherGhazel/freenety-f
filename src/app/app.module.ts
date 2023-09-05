import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SigninComponent } from './auth/signup/signin.component';
import { SigninTalentComponent } from './auth/signup-talent/signin-talent.component';
import { SigninClientComponent } from './auth/signup-client/signin-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { TalentDashboardModule } from './talent-dashboard/talent-dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    SigninTalentComponent,
    SigninClientComponent,
    NavbarComponent,
    SearchComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    TalentDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
