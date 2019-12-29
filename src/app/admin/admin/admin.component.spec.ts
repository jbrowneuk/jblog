import { IMock, It, Mock, Times } from 'typemoq';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleService } from '../../shared/title.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let mockTitleService: IMock<TitleService>;
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    mockTitleService = Mock.ofType<TitleService>();

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TitleService, useFactory: () => mockTitleService.object }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    mockTitleService.verify(x => x.setTitle(It.isValue('Admin')), Times.once());
    expect().nothing();
  });
});
