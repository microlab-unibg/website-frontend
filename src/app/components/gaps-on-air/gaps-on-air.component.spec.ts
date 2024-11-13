import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapsOnAirComponent } from './gaps-on-air.component';

describe('GapsOnAirComponent', () => {
  let component: GapsOnAirComponent;
  let fixture: ComponentFixture<GapsOnAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapsOnAirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GapsOnAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
