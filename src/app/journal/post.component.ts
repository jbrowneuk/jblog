import { Component, Input }       from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { PostData } from "./post-data.class";

@Component({
  selector: "jblog-post",
  templateUrl: "./post.component.html"
})

export class PostComponent {
  @Input() public postData: PostData;

  constructor(private domSanitizer: DomSanitizer) {}

  public getParsedContent(): SafeHtml {
    if (!this.postData) {
      return "";
    }

    const emoji = require("emojione");
    const emojified = emoji.toImage(this.postData.content);
    return this.domSanitizer.bypassSecurityTrustHtml(emojified);
  }

  public hasTags(): boolean {
    return this.postData && this.postData.tags.length > 0;
  }
}
