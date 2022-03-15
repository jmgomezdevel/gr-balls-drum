import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//RxJS
import { Subscription } from 'rxjs'
import { BallI } from 'src/models/ball';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnDestroy{

  public errorMessage: string;

  public form: FormGroup;
  public addOrDeleteBallSuscription: Subscription;

  constructor(
    public dataService: DataService,
    private fb: FormBuilder
  ) {
    this.errorMessage = "";
    this.form = this.fb.group({
      input_stake: new FormControl(5, [Validators.min(5), Validators.required, Validators.pattern('[0-9]+')])
    })

    this.form.valueChanges.subscribe(x => {
      this.dataService.bet.input_stake = x.input_stake;

      if(!x.input_stake || x.input_stake < 5){
        this.dataService.total_money = 0;
      }
    })

    this.addOrDeleteBallSuscription = this.dataService.addOrDeleteBallEmitter$.subscribe( ball => {
      if(this.dataService.total_money != 0){
        this.changeAmount();
      }
    })

  }

  /* This function returns an array with the balls selected and gray balls untill max selection 
  * 
  * @return Array<BallI>
  */
  public ballsSelected(): Array<BallI> {
    let balls_selected = this.dataService.bet.drum.filter(ball => ball.isSelected);
    while(balls_selected.length < this.dataService.bet.max_selection){
      balls_selected.push({number: 1, color:'gray', isSelected: false})
    }
    return balls_selected;
  }

  /* This method is called when we press Ok button in BetSlipComponent. We check this conditions:
  *
  * - If we have at least one ball selected
  * - If we have introduced an input stake
  * - If the input stake introduced is at least 5€ per ball
  * - If the user have the enough money to make the bet
  * 
  * @return boolean
  */
  public changeAmount(): boolean {
    if (this.dataService.balls_selected > 0) {
      if (this.dataService.bet.input_stake) {
        if (this.dataService.bet.input_stake >= 5) {
          if (this.dataService.user.wallet >= this.dataService.bet.input_stake * this.dataService.balls_selected) {
            this.errorMessage = "";
            this.dataService.total_money = this.dataService.bet.input_stake * this.dataService.balls_selected;
            this.dataService.disabledToBet = false;
            return true;
          } else {
            this.errorMessage = "You don't have enough money in your wallet";
          }
        } else {
          this.errorMessage = "The minimum input stake is 5€";
        }
      } else {
        this.errorMessage = "Please enter an input stake greater than 5€";
      }
    } else {
      this.errorMessage = "Select at least one ball";
    }
    this.dataService.total_money = 0;
    this.dataService.disabledToBet = true;
    return false;
  }

  /* This method is called when we press PlaceBet in BetSlipComponent in order to make the bet
  *
  * 1 We take a ball from the drum
  * 2 We check if the ball is in the user's selection
  * 3 We calculate the money that the user have won or lost
  * 4 We switch the state of the game as finished
  * 
  * @return void
  */
  public placeBet(): void {
    if (this.changeAmount()) {
      let result = Math.floor(Math.random() * (this.dataService.bet.n_balls) + 1);

      let index = this.dataService.bet.drum.findIndex(b => b.number === result);
      this.dataService.bet.result_ball = this.dataService.bet.drum[index]

      if (this.dataService.bet.result_ball.isSelected) {
        this.dataService.bet.money_alteration = this.dataService.bet.input_stake * this.dataService.balls_selected;
      } else {
        this.dataService.bet.money_alteration = -1 * this.dataService.bet.input_stake * this.dataService.balls_selected;
      }

      this.dataService.user.wallet += this.dataService.bet.money_alteration;

      this.dataService.state = 'finished'
    }
  }

  /* This method is called when we have to disable the Place Bet button in BetSlipComponent, in order to recheck the amount introduced 
  *
  * @return void
  */
  public disablePlaceBetButton(): void {
    this.dataService.disabledToBet = true;
  }

  /* This method is called when component is destroyed and will delete the addOrDeleteBall suscription
  *
  * @return void
  */
  ngOnDestroy(): void {
    this.addOrDeleteBallSuscription.unsubscribe();
  }

}
