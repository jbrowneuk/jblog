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
const pageOutLeft = `translateX(-${percentageOut}%)`;
const pageOutRight = `translateX(${percentageOut}%)`;
const pageOutTop = `translateY(-${percentageOut}%)`;
const pageOutBottom = `translateY(${percentageOut}%)`;

const enterLeaveQuery = query(':enter, :leave',
  style({ position: 'absolute', left: 0, right: 0 }),
  optionalAnimation);

const increaseSectionId = [
  group([
    enterLeaveQuery,
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
    enterLeaveQuery,
    query(':enter', [
      style({ transform: pageOutLeft, zIndex: 1 }),
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

const licenseTransitionIn = [
  group([
    enterLeaveQuery,
    query(':enter', [
      style({ transform: pageOutBottom, zIndex: 1 }),
      animate(animationEasing, style({ transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ transform: pageOutTop })),
      animateChild()
    ], optionalAnimation)
  ])
];
const licenseTransitionOut = [
  group([
    enterLeaveQuery,
    query(':enter', [
      style({ transform: pageOutTop, zIndex: 1 }),
      animate(animationEasing, style({ transform: 'none' })),
      animateChild()
    ], optionalAnimation),
    query(':leave', [
      style({ transform: 'none', zIndex: 0 }),
      animate(animationEasing, style({ transform: pageOutBottom })),
      animateChild()
    ], optionalAnimation)
  ])
];

export const TRANSITIONS = [
  trigger('routerAnimations', [
    transition(':increment', increaseSectionId),
    transition(':decrement', decreaseSectionId),
    transition('* => licenses', licenseTransitionIn),
    transition('licenses => *', licenseTransitionOut)
  ])
];
