import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisProposalsComponent } from './thesis-proposals.component';

describe('ThesisProposalsComponent', () => {
  let component: ThesisProposalsComponent;
  let fixture: ComponentFixture<ThesisProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisProposalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
