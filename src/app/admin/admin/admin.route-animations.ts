import {
  animate,
  animateChild,
  AnimationQueryOptions,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

const animationEasing = '200ms ease-out';
const optionalAnimation: AnimationQueryOptions = { optional: true };

const enterLeaveQuery = query(
  ':enter, :leave',
  style({ position: 'absolute', left: 0, right: 0 }),
  optionalAnimation
);

const fadeRoutes = [
  group([
    enterLeaveQuery,
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate(animationEasing, style({ opacity: 1 })),
        animateChild()
      ],
      optionalAnimation
    ),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate(animationEasing, style({ opacity: 0 })),
        animateChild()
      ],
      optionalAnimation
    )
  ])
];

export const ROUTE_TRANSITIONS = trigger('adminRouterAnimations', [
  transition('* => *', fadeRoutes)
]);
