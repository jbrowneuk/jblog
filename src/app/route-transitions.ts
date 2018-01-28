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

const animationEasing = '250ms ease-out';
const optionalAnimation: AnimationQueryOptions = { optional: true };

const percentageOut = 100;
const scaleOut = 0.75;
const pageOutLeft = `translateX(-${percentageOut}%) scale(${scaleOut})`;
const pageOutRight = `translateX(${percentageOut}%) scale(${scaleOut})`;

const increaseSectionId = [
  group([
    query(':enter, :leave',
      style({ position: 'absolute', left: 0, right: 0 }),
      optionalAnimation),
    query(':enter', [
      style({ transform: pageOutRight, zIndex: 1 }),
      animate(animationEasing, style({ transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ transform: pageOutLeft })),
      animateChild()
    ], optionalAnimation)
  ])
];
const decreaseSectionId = [
  group([
    query(':enter, :leave',
      style({ position: 'absolute', left: 0, right: 0 }),
      optionalAnimation),
    query(':enter', [
      style({transform: pageOutLeft, zIndex: 1}),
      animate(animationEasing, style({ transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ transform: pageOutRight })),
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
