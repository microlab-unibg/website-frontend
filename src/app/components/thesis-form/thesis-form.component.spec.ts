import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisFormComponent } from './thesis-form.component';

describe('ThesisFormComponent', () => {
  let component: ThesisFormComponent;
  let fixture: ComponentFixture<ThesisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
