import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrockerDetailesComponent } from './brocker-detailes.component';

describe('BrockerDetailesComponent', () => {
  let component: BrockerDetailesComponent;
  let fixture: ComponentFixture<BrockerDetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrockerDetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrockerDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
