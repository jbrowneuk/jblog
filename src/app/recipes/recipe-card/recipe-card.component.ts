import { Component, Input } from '@angular/core';

import { RecipeData } from '../recipe-data';

@Component({
  selector: 'jblog-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: [
    './recipe-card.component.scss',
    '../../../theme/gallery-card.scss'
  ]
})
export class RecipeCardComponent {

  @Input() recipe: RecipeData;

  constructor() { }

}
