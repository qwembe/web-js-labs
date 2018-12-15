import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailesComponent } from './stock-detailes.component';

describe('StockDetailesComponent', () => {
  let component: StockDetailesComponent;
  let fixture: ComponentFixture<StockDetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
