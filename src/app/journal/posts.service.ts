import { Injectable }               from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { PostData }           from "./post-data.class";
import { PostDataContainer }  from "./post-data-container.class";

@Injectable()
export class PostsService {
  private postsUrl = "/api/posts.php";

  constructor(private http: Http) {}

  public getPostData(pageNumber: number = 0): Promise<PostDataContainer> {
    let apiRequestUrl = this.postsUrl;
    if (pageNumber > 0) {
      apiRequestUrl += "?page=" + pageNumber;
    }

    return this.http.get(apiRequestUrl)
      .toPromise()
      .then(this.handlePostsResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private handlePostsResponse(response: Response): PostDataContainer {
    return response.json() as PostDataContainer;
  }
}
