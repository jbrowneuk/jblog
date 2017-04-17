import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/**
 * An interface which can be used by a class to encapsulate a pagination segment
 */
interface PaginationSegment {
  /**
   * Whether this segment is clickable or not
   */
  isLink: boolean;

  /**
   * Which page this segment represents
   */
  pageNumber: number;
}

/**
 * A component that shows pagination links for multiple-page views
 */
@Component({
  selector: 'jblog-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {

  /**
   * The current page in the view
   */
  @Input() public currentPage: number;

  /**
   * The total number of pages in the view
   */
  @Input() public totalPages: number;

  /**
   * The name of the containing component, so generated links point to it
   */
  @Input() public componentName: string;

  /**
   * Optional URL components to put before the page number
   * @example if ['a', 'b', 'c'] is specified, the resulting URL will be in the
   * format `/a/b/c/pageNumber`
   */
  @Input() public urlComponents: string[];

  /**
   * Boolean to signify whether parent component is loading that can prevent
   * pagination segments from appering before data is completely loaded
   */
  @Input() public isLoading = false;

  /**
   * List of pagination segments
   */
  public segments: PaginationSegment[];

  /**
   * Generates pagination segments when the component is initialized
   */
  ngOnInit() {
    this.generateNumericLinks();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only update the pagination links if the page has changed
    if (!changes['currentPage']) {
      return;
    }

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
