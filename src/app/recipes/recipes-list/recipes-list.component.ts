import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { TitleService } from '../../shared/title.service';

import { RecipeData } from '../recipe-data';

@Component({
  selector: 'jblog-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  public isLoading: boolean;
  public initialPage: number;
  public page: number;
  public recipes: RecipeData[];

  constructor(
    private route: ActivatedRoute,
    private service: RecipesService,
    private titleService: TitleService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.onStartLoading();
      this.recipes = []; // Fix for Safari hanging

      this.initialPage = +params['page'] || 1;
      this.page = this.initialPage;
      this.service.getRecipes(this.page).subscribe(
        x => this.handleSuccessfulResponse(x),
        e => this.handleUnsuccessfulResponse(e),
        () => this.onEndLoading()
      );
    });
  }

  private onStartLoading(): void {
    this.isLoading = true;
  }

  private onEndLoading(): void {
    this.isLoading = false;
    console.log('end loading');
  }

  private handleSuccessfulResponse(data: RecipeData[]): void {
    this.recipes = this.recipes.concat(data);
    this.titleService.setTitle('Recipes');
  }

  private handleUnsuccessfulResponse(e: any): void {
    console.log('Error: %s', e);
  }

}
