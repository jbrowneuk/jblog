import { Injectable }     from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { PostData }           from "./post-data.class";
import { PostDataContainer }  from "./post-data-container.class";

@Injectable()
export class PostsService {
  private postsUrl = "/api/posts.php";

  constructor(private http: Http) {}

  public getPostData(amount: number = 10, offset: number = 0): Promise<PostDataContainer> {
    return this.http.get(this.postsUrl)
      .toPromise()
      .then(this.handlePostsResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // TODO: log somewhere more useful
    return Promise.reject(error.message || error);
  }

  private handlePostsResponse(response: Response): PostDataContainer {
    return response.json() as PostDataContainer;
  }
}
