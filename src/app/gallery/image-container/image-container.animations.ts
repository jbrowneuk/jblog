import {
  trigger,
  animate,
  style,
  stagger,
  query,
  transition
} from '@angular/animations';

export const GalleryCardTransitions = trigger('galleryCardTransitions', [
  transition('* => *', [
    query('jblog-thumbnail:enter', [style({ opacity: 0 }), stagger(20, [animate(200, style({ opacity: 1 }))])], { optional: true })
  ])
]);
