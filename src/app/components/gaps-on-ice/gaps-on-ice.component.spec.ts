import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapsOnIceComponent } from './gaps-on-ice.component';

describe('GapsOnIceComponent', () => {
  let component: GapsOnIceComponent;
  let fixture: ComponentFixture<GapsOnIceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapsOnIceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GapsOnIceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
