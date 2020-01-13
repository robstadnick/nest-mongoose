import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailCodeComponent } from './verify-email-code.component';

describe('VerifyEmailCodeComponent', () => {
  let component: VerifyEmailCodeComponent;
  let fixture: ComponentFixture<VerifyEmailCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
