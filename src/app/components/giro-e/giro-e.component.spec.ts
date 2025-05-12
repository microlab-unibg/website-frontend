import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiroEComponent } from './giro-e.component';

describe('GiroEComponent', () => {
  let component: GiroEComponent;
  let fixture: ComponentFixture<GiroEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiroEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiroEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
