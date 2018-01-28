import { Component, OnInit } from '@angular/core';

import { RecipeData } from '../recipe-data';

@Component({
  selector: 'jblog-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  public isLoading: boolean;
  public recipes: RecipeData[];

  constructor() {
    this.isLoading = false;
  }

  ngOnInit() {
    this.recipes = [
      { id: 'food001', title: 'some dish', description: 'food' }
    ];
  }

}
