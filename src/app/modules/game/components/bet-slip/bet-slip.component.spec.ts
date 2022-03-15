import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BetSlipComponent } from './bet-slip.component';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BetSlipComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ballsSelected should return an array of ballls with the same length that max_selection', () => {
    expect(component.ballsSelected().length).toBe(component.dataService.bet.max_selection)
  });

  it('changeAmount should return false if the money of the bet is greater than the user wallet', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 5;
    component.dataService.balls_selected = 3
    expect(component.changeAmount()).toBeFalse();
  });

  it('changeAmount should return false if the input stake is lower than 5', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 4;
    component.dataService.balls_selected = 1;
    expect(component.changeAmount()).toBeFalse();
  });

  it('changeAmount should return true if input stake is a number greater or equal than 5 and the user have the enough money to make the bet', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 5;
    component.dataService.balls_selected = 1;
    expect(component.changeAmount()).toBeTrue();
  });

});
