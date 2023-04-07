import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchInterestComponent } from './research-interest.component';

describe('ResearchInterestComponent', () => {
  let component: ResearchInterestComponent;
  let fixture: ComponentFixture<ResearchInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
