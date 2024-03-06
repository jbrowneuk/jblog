import { PageObjectBase } from 'src/app/lib/testing/page-object.base';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesComponent } from './licenses.component';

describe('LicensesComponent', () => {
  let fixture: ComponentFixture<LicensesComponent>;
  let pageObject: LicensesPageObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicensesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    pageObject = new LicensesPageObject(fixture);
    fixture.detectChanges();
  });

  it('should have a container with IDE and Editor credits', () => {
    expect(pageObject.ideCreditBlock).toBeTruthy();
  });

  it('should have a container with third-party credits', () => {
    expect(pageObject.thirdPartyCreditBlock).toBeTruthy();
  });
});

class LicensesPageObject extends PageObjectBase<LicensesComponent> {
  get ideCreditBlock() {
    return this.selectByDataAttribute('ide-credits');
  }

  get thirdPartyCreditBlock() {
    return this.selectByDataAttribute('thirdparty-credits');
  }
}
