import { Component, Input } from "@angular/core";

import { PostData } from "./post-data.class";

@Component({
  selector: "jblog-post",
  templateUrl: "./post.component.html"
})

export class PostComponent {
  @Input() public postData: PostData;
}
