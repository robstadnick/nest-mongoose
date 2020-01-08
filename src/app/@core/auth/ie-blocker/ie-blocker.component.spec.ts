import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeBlockerComponent } from './ie-blocker.component';

describe('IeBlockerComponent', () => {
  let component: IeBlockerComponent;
  let fixture: ComponentFixture<IeBlockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeBlockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
