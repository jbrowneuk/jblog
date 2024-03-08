import { Observable } from 'rxjs';

import { Inject, Injectable, Optional } from '@angular/core';

import { PostData } from '../model/post-data';
import { UserService } from '../services/user.service';
import { BASE_PATH } from '../variables';

const API_URL = '/?admin&action=posts';

@Injectable({
  providedIn: 'root'
})
export class PostAdminService {
  protected basePath = 'http://localhost/api';

  constructor(
    private userService: UserService,
    @Optional() @Inject(BASE_PATH) basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  public sendPost(post: PostData): Observable<void> {
    const body = new FormData();
    body.append('data', JSON.stringify(post));

    return this.userService.authPost(`${this.basePath}${API_URL}`, body);
  }
}
