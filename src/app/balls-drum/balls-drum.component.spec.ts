import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallsDrumComponent } from './balls-drum.component';

describe('BallsDrumComponent', () => {
  let component: BallsDrumComponent;
  let fixture: ComponentFixture<BallsDrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallsDrumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallsDrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
