import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Ball } from 'src/models/ball';
import { Bet } from 'src/models/bet';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  public errorMessage: string;

  constructor(
    public dataService: DataService
  ) {
    this.errorMessage = "";
   }



  ngOnInit(): void {
    let self = this;
    document.getElementById("input_stake_money")?.addEventListener("keyup", function () {
      self.disablePlaceBetButton();
    });
  }

  changeAmount(){
    let placeButton = <HTMLButtonElement> document.getElementById("place_bet_button");
    let input_stake = <HTMLInputElement> document.getElementById('input_stake_money')
    if(this.dataService.bet.balls_selected.length > 0){
      if (input_stake && input_stake.value){
        let val = parseInt(input_stake.value);
        if(val >= 5){
          if(this.dataService.user.wallet >= val * this.dataService.bet.balls_selected.length){
            this.errorMessage = "";
            input_stake.classList.remove("red-border")
            this.dataService.bet.input_stake = val;
            this.dataService.total_money = this.dataService.bet.input_stake * this.dataService.bet.balls_selected.length;
            placeButton.disabled = false;
            return true;
          }else{
            input_stake.classList.add("red-border")
            this.errorMessage = "You don't have enough money in your wallet";
          }
        }else{
          input_stake.classList.add("red-border")
          this.errorMessage = "The minimum input stake is 5€";
        }
      }else{
        input_stake.classList.add("red-border")
        this.errorMessage = "Please enter an input stake greater than 5€";
      }
    }else{
      this.errorMessage = "Select at least one ball";
    }
    placeButton.disabled = true;
    return false;
  }

  placeBet(){
    if(this.changeAmount()){
      let result = Math.floor(Math.random() * (this.dataService.bet.n_balls) + 1);

      let index = this.dataService.bet.drum.findIndex(b => b.number === result);
      this.dataService.bet.result_ball = this.dataService.bet.drum[index]

      let won = this.dataService.bet.balls_selected.findIndex(b => b.number === result);

      if(won != -1){
        this.dataService.bet.money_alteration = this.dataService.bet.input_stake * this.dataService.bet.balls_selected.length;
      }else{
        this.dataService.bet.money_alteration = -1 * this.dataService.bet.input_stake * this.dataService.bet.balls_selected.length;
      }

      this.dataService.user.wallet+=this.dataService.bet.money_alteration;

      this.dataService.state='finished'

      // At this point, we should update user in DB and upload the bet, and then restart the game
      setTimeout(() => {
        this.dataService.restartGame();
      }, 2500);

    }
  }

  disablePlaceBetButton(){
    let placeButton = <HTMLButtonElement> document.getElementById("place_bet_button");
    placeButton.disabled = true;
  }

}
