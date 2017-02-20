import { Component, Input } from "@angular/core";

@Component({
  selector: "jblog-pagination",
  templateUrl: "pagination.component.html"
})
export class PaginationComponent {
  @Input() public currentPage: number;
  @Input() public totalPages: number;
  @Input() public componentName: string;
  @Input() public urlComponents: string[];
  @Input() public isLoading: boolean = false;

  public hasNextPage(): boolean {
    return !this.isLoading && this.currentPage < this.totalPages && this.totalPages > 1;
  }

  public hasPreviousPage(): boolean {
    return !this.isLoading && this.currentPage > 1 && this.totalPages > 1;
  }

  public getRouterLinkForPage(page: number): any[] {
    let bits: any[] = [];
    if (this.componentName) {
      bits.push(`/${this.componentName}`);
    }

    if (this.urlComponents) {
      bits = ["/"].concat(this.urlComponents);
    }

    bits.push("page");
    bits.push(page);
    return bits;
  }
}
