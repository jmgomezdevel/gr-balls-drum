import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Ball } from 'src/models/ball';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  constructor(
    public dataService: DataService
  ) { 
  }

  ngOnInit(): void {
    
  }

  ballIncluded = (element:Ball) => this.dataService.bet.balls_selected.some(b => b.number === element.number && b.color === element.color);

  addOrDeleteBall(ball: Ball){
    let placeButton = <HTMLButtonElement> document.getElementById("place_bet_button");
    let index = this.dataService.bet.balls_selected.findIndex(b => b.number === ball.number && b.color === ball.color);
    if(index != -1){
      this.dataService.bet.balls_selected.splice(index, 1)
    }else{
      if(this.dataService.bet.balls_selected.length < this.dataService.bet.max_selection){
        this.dataService.bet.balls_selected.push(ball)
      }
    }
    placeButton.disabled = true;
  }

  clearSelection(){
    this.dataService.bet.balls_selected = [];
  }

}
