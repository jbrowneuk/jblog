import {
  trigger,
  animate,
  style,
  group,
  query,
  transition
} from '@angular/animations';

const timing = '200ms ease-out';
const delay = 100;

const optionalAnimation = { optional: true };
const delayedOptionalAnimation = { optional: true, delay: delay };

const textTransformIn = 'none';
const textTransformOut = 'scale(0.8)';
const imageTransformIn = 'none';
const imageTransformOut = 'translateX(10%) scale(0.8)';

const enter = query(
  ':enter',
  group([
    query(
      '.text',
      [
        style({ opacity: 0, transform: textTransformOut }),
        animate(timing, style({ opacity: 1, transform: textTransformIn }))
      ],
      optionalAnimation
    ),
    query(
      '.image',
      style({ opacity: 0, transform: imageTransformOut }),
      optionalAnimation
    ),
    query(
      '.image',
      animate(timing, style({ opacity: 1, transform: imageTransformIn })),
      delayedOptionalAnimation
    )
  ]),
  optionalAnimation
);

const leave = query(
  ':leave',
  group([
    query(
      '.text',
      [
        style({ opacity: 1, transform: textTransformIn }),
        animate(timing, style({ opacity: 0, transform: textTransformOut }))
      ],
      optionalAnimation
    ),
    query(
      '.image',
      [
        style({ opacity: 1, transform: imageTransformIn }),
        animate(timing, style({ opacity: 0, transform: imageTransformOut }))
      ],
      delayedOptionalAnimation
    )
  ]),
  optionalAnimation
);

export const TopPageTransitions = [
  trigger('carouselTransitions', [transition('* => *', group([enter, leave]))])
];
