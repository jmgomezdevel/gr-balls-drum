import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BetSlipComponent } from './bet-slip.component';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BetSlipComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('numSequence should return an array of numbers with the same length that n_balls', () => {
    expect(component.numSequence().length).toBe(component.dataService.bet.n_balls)
  });

  it('changeAmount should return false if the money of the bet is greater than the user wallet', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 5;
    component.dataService.bet.balls_selected = [{ number: 1, color: 'red' }, { number: 1, color: 'red' }, { number: 1, color: 'red' }]
    expect(component.changeAmount()).toBeFalse();
  });

  it('changeAmount should return false if the input stake is lower than 5', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 4;
    component.dataService.bet.balls_selected = [{ number: 1, color: 'red' }]
    expect(component.changeAmount()).toBeFalse();
  });

  it('changeAmount should return true if input stake is a number greater or equal than 5 and the user have the enough money to make the bet', () => {
    component.dataService.user.wallet = 10
    component.dataService.bet.input_stake = 5;
    component.dataService.bet.balls_selected = [{ number: 1, color: 'red' }]
    expect(component.changeAmount()).toBeTrue();
  });

});
