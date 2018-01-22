import {
  trigger,
  animate,
  AnimationQueryOptions,
  style,
  group,
  animateChild,
  query,
  stagger,
  sequence,
  transition
} from '@angular/animations';

const animationEasing = '250ms ease';
const optionalAnimation: AnimationQueryOptions = { optional: true };

const increaseSectionId = [
  group([
    query(':enter, :leave',
      style({position: 'absolute', left: 0, right: 0}),
      optionalAnimation),
    query(':enter', [
      style({transform: 'translateX(100%)', zIndex: 1}),
      animate(animationEasing, style({transform: 'none'})),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({transform: 'none', zIndex: 0}),
      animate(animationEasing, style({transform: 'translateX(-100%)'})),
      animateChild()
    ], optionalAnimation)
  ])
];
const decreaseSectionId = [
  group([
    query(':enter, :leave',
      style({position: 'absolute', left: 0, right: 0}),
      optionalAnimation),
    query(':enter', [
      style({transform: 'translateX(-100%)', zIndex: 1}),
      animate(animationEasing, style({transform: 'none'})),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({transform: 'none', zIndex: 0}),
      animate(animationEasing, style({transform: 'translateX(100%)'})),
      animateChild()
    ], optionalAnimation)
  ])
];

export const TRANSITIONS = [
  trigger('routerAnimations', [
    transition(':increment', increaseSectionId),
    transition(':decrement', decreaseSectionId)
  ])
];
