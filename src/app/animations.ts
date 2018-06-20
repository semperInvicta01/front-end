
import { animate, state, style, transition, trigger, query, group } from '@angular/animations';

export class Animations {
}
// Component transition animations
export const slideInDownAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);

  export function routerTransition() {
    return slideToLeft();
  }

  function slideToLeft() {
    return trigger('routerTransition', [
      state('void', style({position:'fixed', width:'100%'}) ),
      state('*', style({position:'fixed', width:'100%'}) ),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0.5s ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]);
  }
  export const fadeAnimation = trigger('fadeAnimation', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
      // The query function has three params.
      // First is the event, so this will apply on entering or when the element is added to the DOM.
      // Second is a list of styles or animations to apply.
      // Third we add a config object with optional set to true, this is to signal
      // angular that the animation may not apply as it may or may not be in the DOM.
      query(
        ':enter',
        [style({ opacity: 0 })],
        { optional: true }
      ),
      query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]);