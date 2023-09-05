import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })), // Initial state
  transition(':enter, :leave', [ // Define transitions for entering and leaving
    animate(300, style({ opacity: 1 })), // Duration and target style
  ]),
]);


export const translateY = trigger('translateY', [
    state('void', style({ transform: 'translateY(-100%)' })), // Initial state, off-screen top
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }), // Start off-screen top
      animate('500ms ease-in', style({ transform: 'translateY(0%)' })), // Translate to 0% (on-screen)
    ]),
    transition(':leave', [
      animate('800ms ease-out', style({ transform: 'translateY(-100%)' })), // Translate off-screen top
    ]),
  ]);