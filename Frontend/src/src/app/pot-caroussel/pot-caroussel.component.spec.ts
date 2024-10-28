import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotCarousselComponent } from './pot-caroussel.component';

describe('PotCarousselComponent', () => {
  let component: PotCarousselComponent;
  let fixture: ComponentFixture<PotCarousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotCarousselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotCarousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
