import {
  animate,
  animateChild,
  AnimationQueryOptions,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

const animationEasing = '200ms ease-out';
const footerAnimationTiming = 300;

const optionalAnimation: AnimationQueryOptions = { optional: true };

const percentageOut = 1;
const scaleOut = 0.99;
const pageOutLeft = `translateX(-${percentageOut}%) scale(${scaleOut})`;
const pageOutRight = `translateX(${percentageOut}%) scale(${scaleOut})`;

const enterLeaveQuery = query(
  ':enter, :leave',
  style({ position: 'absolute', left: 0, right: 0 }),
  optionalAnimation
);

const increaseSectionId = [
  group([
    enterLeaveQuery,
    query(
      ':enter',
      [
        style({ opacity: 0, transform: pageOutRight, zIndex: 1 }),
        animate(animationEasing, style({ opacity: 1, transform: 'none' })),
        animateChild()
      ],
      optionalAnimation
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'none', zIndex: 0 }),
        animate(animationEasing, style({ opacity: 0, transform: pageOutLeft })),
        animateChild()
      ],
      optionalAnimation
    )
  ])
];
const decreaseSectionId = [
  group([
    enterLeaveQuery,
    query(
      ':enter',
      [
        style({ opacity: 0, transform: pageOutLeft, zIndex: 1 }),
        animate(animationEasing, style({ opacity: 1, transform: 'none' })),
        animateChild()
      ],
      optionalAnimation
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'none', zIndex: 0 }),
        animate(
          animationEasing,
          style({ opacity: 0, transform: pageOutRight })
        ),
        animateChild()
      ],
      optionalAnimation
    )
  ])
];

const footerQuery = animate(
  footerAnimationTiming,
  keyframes([
    style({ opacity: 0, offset: 0 }),
    style({ opacity: 0, offset: 0.75 }),
    style({ opacity: 1, offset: 1 })
  ])
);

export const TRANSITIONS = [
  trigger('routerAnimations', [
    transition(':increment', increaseSectionId),
    transition(':decrement', decreaseSectionId),
    transition('* => licenses, * => login', increaseSectionId),
    transition('licenses => *, login => *', decreaseSectionId)
  ]),
  trigger('footerAnimations', [transition('* => *', footerQuery)])
];
