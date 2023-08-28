import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('@myInsertRemoveTrigger', [
      // ...
      state('inserted', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('removed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('* => inserted', [
        animate('1s')
      ]),
      transition('* => removed', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'Freenety';

}
