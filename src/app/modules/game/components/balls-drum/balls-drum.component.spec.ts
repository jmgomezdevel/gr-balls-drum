import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallsDrumComponent } from './balls-drum.component';

describe('BallsDrumComponent', () => {
  let component: BallsDrumComponent;
  let fixture: ComponentFixture<BallsDrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallsDrumComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallsDrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('constructor should have initialized drum, that should have the same length that n_balls ', () => {
    expect(component.dataService.bet.drum.length).toEqual(component.n_balls)
  });

});
