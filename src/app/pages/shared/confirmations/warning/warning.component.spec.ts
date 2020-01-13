import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationWarningComponent } from './warning.component';

describe('ConfirmationWarningComponent', () => {
  let component: ConfirmationWarningComponent;
  let fixture: ComponentFixture<ConfirmationWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
