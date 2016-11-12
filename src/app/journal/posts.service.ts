import { Injectable }     from "@angular/core";
import { Headers, Http }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { PostData } from "./post-data.class";

@Injectable()
export class PostsService {
  private postsUrl = "/api/posts.php";

  constructor(private http: Http) {}

  getPosts(amount: number = 10, offset: number = 0): Promise<PostData[]> {
    return this.http.get(this.postsUrl)
      .toPromise()
      .then(response => response.json().data as PostData[])
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // TODO: log somewhere more useful
    return Promise.reject(error.message || error);
  }
}
