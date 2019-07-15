import { trigger, animate, transition, style } from '@angular/animations';

const animationTime = 200;

const fadeEnterTransition = transition(':enter', [
  style({ opacity: 0 }),
  animate(animationTime, style({ opacity: 1 }))
]);
const fadeLeaveTransition = transition(':leave', [
  style({ opacity: 1 }),
  animate(animationTime, style({ opacity: 0 }))
]);
const visibilityAnimation = trigger('visibilityFade', [
  fadeEnterTransition,
  fadeLeaveTransition
]);

export const Transitions = {
  visibilityFade: visibilityAnimation
};
