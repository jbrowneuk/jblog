import {
  transition,
  trigger,
  style,
  animate,
  keyframes
} from '@angular/animations';

const outTransform = 'rotateX(-15deg) scale(0.9)';

const entryExit = trigger('UserMenuAnimation', [
  transition(
    ':enter',
    animate(
      200,
      keyframes([
        style({ opacity: 0, transform: outTransform, offset: 0 }),
        style({ opacity: 1, transform: 'none', offset: 1 })
      ])
    )
  ),
  transition(
    ':leave',
    animate(
      100,
      keyframes([
        style({ opacity: 1, transform: 'none', offset: 0 }),
        style({ opacity: 0, transform: outTransform, offset: 1 })
      ])
    )
  )
]);

export const UserMenuAnimation = [entryExit];
