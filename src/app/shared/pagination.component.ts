import { Component, Input } from "@angular/core";

@Component({
  selector: "jblog-pagination",
  templateUrl: "pagination.component.html"
})
export class PaginationComponent {
  @Input() public currentPage: number;
  @Input() public totalPages: number;
  @Input() public componentName: string;

  public hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
