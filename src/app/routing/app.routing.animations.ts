import {trigger, state, animate, style, transition} from '@angular/animations';

export function routerTransition() {
  return opacity();
}

export function opacity() {
  return trigger('routerTransition', [
    //state('void', style({ position: 'absolute', width: '100%' }) ),
    //state('*', style({ position: 'absolute', width: '100%' }) ),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s .2s ease-in-out', style({ opacity: 1 }))
    ])
  ]);
}