import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchQuestionComponent } from './branch-question.component';

describe('BranchQuestionComponent', () => {
  let component: BranchQuestionComponent;
  let fixture: ComponentFixture<BranchQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
