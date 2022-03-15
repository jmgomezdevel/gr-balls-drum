import { Component } from '@angular/core';
import { BallI } from 'src/models/ball';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent {

  constructor(
    public dataService: DataService
  ) { 

  }

  /* This method emit an event to dataService with a ball to select
  *
  * @return void
  */
  addOrDeleteBall(ball: BallI): void{
    this.dataService.addOrDeleteBallEmitter$.emit(ball)
  }

}
