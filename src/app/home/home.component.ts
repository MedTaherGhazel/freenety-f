import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fadeIn, translateY } from '../app.animations';

@Component({
  
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeIn,
    translateY
  ],

})
export class HomeComponent {

  show : boolean = true ;
}

