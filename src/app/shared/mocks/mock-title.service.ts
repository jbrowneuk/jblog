export class MockTitleService {
  public mockTitle: string;

  constructor() {
    this.mockTitle = '';
  }

  public resetTitle(): void {
    this.mockTitle = '';
  }

  public setTitle(title: string): void {
    this.mockTitle = title;
  }
}
