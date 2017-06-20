import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Project } from './project';

export class MockProjectService {
  public getProjects(pageNumber: number, amount: number = 0): Observable<Project[]> {
    return Observable.of([{
      'name': 'test',
      'title': 'A test project',
      'summary': 'Description of the test project',
      'info': 'JSON data',
      'link': 'https://www.google.com/',
      'resourcesUrl': 'http://localhost:4200/assets/images/'
    }]);
  }
}
