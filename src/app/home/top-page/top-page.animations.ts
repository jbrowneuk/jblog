import {
  trigger,
  animate,
  style,
  group,
  query,
  transition
} from '@angular/animations';

const optionalAnimation = { optional: true };
const timing = '200ms ease-out';
const delay = 100;

const textTransformIn = 'none';
const textTransformOut = 'scale(0.8)';
const imageTransformIn = 'none';
const imageTransformOut = 'translateX(-10%) scale(0.8)';

const enter = query(
  ':enter',
  group([
    query('.text', style({ opacity: 0, transform: textTransformOut })),
    query('.image', style({ opacity: 0, transform: imageTransformOut })),
    query(
      '.text',
      animate(timing, style({ opacity: 1, transform: textTransformIn }))
    ),
    query(
      '.image',
      animate(timing, style({ opacity: 1, transform: imageTransformIn })),
      { delay: delay }
    )
  ])
);

const leave = query(
  ':leave',
  group([
    query('.text', [
      style({ opacity: 1, transform: textTransformIn }),
      animate(timing, style({ opacity: 0, transform: textTransformOut }))
    ]),
    query('.image', [
      style({ opacity: 1, transform: imageTransformIn }),
      animate(timing, style({ opacity: 0, transform: imageTransformOut }))
    ])
  ]),
  optionalAnimation
);

export const TopPageTransitions = [
  trigger('carouselTransitions', [transition('* => *', group([enter, leave]))])
];
