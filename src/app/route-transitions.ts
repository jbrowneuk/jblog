import {
  trigger,
  animate,
  AnimationQueryOptions,
  style,
  group,
  animateChild,
  query,
  transition
} from '@angular/animations';

const animationEasing = '200ms ease-out';
const optionalAnimation: AnimationQueryOptions = { optional: true };

const percentageOut = 10;
const pageOutLeft = `translateX(-${percentageOut}%)`;
const pageOutRight = `translateX(${percentageOut}%)`;

const enterLeaveQuery = query(':enter, :leave',
  style({ position: 'absolute', left: 0, right: 0 }),
  optionalAnimation);

const increaseSectionId = [
  group([
    enterLeaveQuery,
    query(':enter', [
      style({ opacity: 0, transform: pageOutRight, zIndex: 1 }),
      animate(animationEasing, style({ opacity: 1, transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ opacity: 1, transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ opacity: 0, transform: pageOutLeft })),
      animateChild()
    ], optionalAnimation)
  ])
];
const decreaseSectionId = [
  group([
    enterLeaveQuery,
    query(':enter', [
      style({ opacity: 0, transform: pageOutLeft, zIndex: 1 }),
      animate(animationEasing, style({ opacity: 1, transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ opacity: 1, transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ opacity: 0, transform: pageOutRight })),
      animateChild()
    ], optionalAnimation)
  ])
];

export const TRANSITIONS = [
  trigger('routerAnimations', [
    transition(':increment', increaseSectionId),
    transition(':decrement', decreaseSectionId),
    transition('* => licenses', decreaseSectionId),
    transition('licenses => *', increaseSectionId)
  ])
];
