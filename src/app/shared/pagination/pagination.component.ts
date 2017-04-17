import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/**
 * An interface which can be used by a class to encapsulate a pagination segment.
 */
interface PaginationSegment {
  /**
   * Whether this segment is clickable or not.
   */
  isLink: boolean;

  /**
   * Which page this segment represents.
   */
  pageNumber: number;
}

/**
 * A component that shows pagination links for multiple-page views.
 */
@Component({
  selector: 'jblog-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {

  /**
   * The current page in the view.
   */
  @Input() public currentPage: number;

  /**
   * The total number of pages in the view.
   */
  @Input() public totalPages: number;

  /**
   * The name of the containing component, so generated links point to it.
   */
  @Input() public componentName: string;

  /**
   * Optional URL components to put before the page number.
   * @example if ['a', 'b', 'c'] is specified, the resulting URL will be in the
   * format `/a/b/c/pageNumber`.
   */
  @Input() public urlComponents: string[];

  /**
   * Boolean to signify whether parent component is loading that can prevent
   * pagination segments from appering before data is completely loaded
   */
  @Input() public isLoading = false;

  /**
   * List of {@link PaginationSegment}s.
   */
  public segments: PaginationSegment[];

  /**
   * Called when the component is initialized. Uased to generate
   * {@link PaginationSegment}s.
   */
  ngOnInit() {
    this.generateNumericLinks();
  }

  /**
   * Called when the component inputs are changed. Uased to generate
   * {@link PaginationSegment}s.
   */
  ngOnChanges(changes: SimpleChanges) {
    // Only update the pagination links if the page has changed
    if (!changes['currentPage']) {
      return;
    }

    this.generateNumericLinks();
  }

  /**
   * Gets whether there is a next page.
   */
  public hasNextPage(): boolean {
    return !this.isLoading &&
           this.currentPage < this.totalPages &&
           this.totalPages > 1;
  }

  /**
   * Gets whether there is a previous page.
   */
  public hasPreviousPage(): boolean {
    return !this.isLoading &&
           this.currentPage > 1 &&
           this.totalPages > 1;
  }

  /**
   * Gets a full Angular Router path for a specific page.
   */
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

  /**
   * Generates the main {@link PaginationSegment}s that build up the view.
   */
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

  /**
   * Convenience method that wraps the generation of a {@link PaginationSegment}
   * for a page.
   */
  private generateNumericSegmentForPage(page: number): PaginationSegment {
    return { isLink: true, pageNumber: page };
  }

  /**
   * Convenience method that wraps the generation of a {@link PaginationSegment}
   * for a non-page spacer.
   */
  private generateSpacerSegment(): PaginationSegment {
    return { isLink: false, pageNumber: 0 };
  }

}
