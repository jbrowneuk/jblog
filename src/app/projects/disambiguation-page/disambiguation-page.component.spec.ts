import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisambiguationPageComponent } from './disambiguation-page.component';

describe('DisambiguationPageComponent', () => {
  let component: DisambiguationPageComponent;
  let fixture: ComponentFixture<DisambiguationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisambiguationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisambiguationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
