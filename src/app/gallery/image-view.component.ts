import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  providers: [ ImageService ],
  selector: "jblog-image-view",
  templateUrl: "./image-view.component.html"
})
export class ImageViewComponent implements OnInit {
  ngOnInit(): void {}
}
