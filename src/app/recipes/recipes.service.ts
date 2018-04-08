import { Inject, Injectable, Optional } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BASE_PATH } from '../variables';
import { RecipeData } from './recipe-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = '/?recipes';

@Injectable()
export class RecipesService {

  private basePath = 'http://localhost/api';

  constructor(private http: Http, @Optional()@Inject(BASE_PATH) basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  public getRecipes(pageNumber: number): Observable<RecipeData[]> {
    let apiRequestUrl = `${this.basePath}${API_URL}`;
    if (pageNumber > 0) {
      apiRequestUrl += `&page=${pageNumber}`;
    }

    return this.http.get(apiRequestUrl)
      .map((response: Response) => this.handleResponse(response))
      .catch((error: any) => this.handleError(error));
  }

  private handleResponse(response: Response): RecipeData[] {
    return response.json().data as RecipeData[];
  }

  private handleError(error: any): Observable<any> {
    const errorMessage = error.json().error || error || 'Server error.';
    return Observable.throw(errorMessage);
  }

}
