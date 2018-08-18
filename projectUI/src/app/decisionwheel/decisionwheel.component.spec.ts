import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionwheelComponent } from './decisionwheel.component';

describe('DecisionwheelComponent', () => {
  let component: DecisionwheelComponent;
  let fixture: ComponentFixture<DecisionwheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionwheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
