import { Component, Input, OnInit } from '@angular/core';

interface PaginationSegment {
  isLink: boolean;
  pageNumber: number;
}

@Component({
  selector: 'jblog-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  @Input() public currentPage: number;
  @Input() public totalPages: number;
  @Input() public componentName: string;
  @Input() public urlComponents: string[];
  @Input() public isLoading = false;

  public segments: PaginationSegment[];

  ngOnInit() {
    this.generateNumericLinks();
  }

  public hasNextPage(): boolean {
    return !this.isLoading &&
           this.currentPage < this.totalPages &&
           this.totalPages > 1;
  }

  public hasPreviousPage(): boolean {
    return !this.isLoading &&
           this.currentPage > 1 &&
           this.totalPages > 1;
  }

  public getRouterLinkForPage(page: number): any[] {
    let bits: any[] = [];
    if (this.componentName) {
      bits.push(`${this.componentName}`);
    }

    if (this.urlComponents) {
      bits = ['/'].concat(this.urlComponents);
    }

    bits.push('page');
    bits.push(page);
    return bits;
  }

  private generateNumericLinks(): void {
    const segmentPaddedBy = 2;
    const topEnd = this.totalPages + 1;

    // Initialise and add bottom number
    this.segments = [this.generateNumericSegmentForPage(1)];

    // Only one page - only one link needed
    if (this.totalPages <= 1) {
      return;
    }

    // Adds an ellipsis if far enough from LHS
    if (this.currentPage > segmentPaddedBy * 2) {
      this.segments.push(this.generateSpacerSegment());
    }

    // Adds the central block of segments
    for (let counter = (this.currentPage - segmentPaddedBy);
         counter <= (this.currentPage + segmentPaddedBy);
         counter++) {

      if (counter < segmentPaddedBy || counter > topEnd - segmentPaddedBy) {
        continue;
      }

      this.segments.push(this.generateNumericSegmentForPage(counter));
    }

    // Adds an ellipsis if far enough from RHS
    if (this.currentPage < topEnd - (segmentPaddedBy * 2)) {
      this.segments.push(this.generateSpacerSegment());
    }

    // Adds top number
    this.segments.push(this.generateNumericSegmentForPage(this.totalPages));
  }

  private generateNumericSegmentForPage(page: number): PaginationSegment {
    return { isLink: true, pageNumber: page };
  }

  private generateSpacerSegment(): PaginationSegment {
    return { isLink: false, pageNumber: 0 };
  }

}
