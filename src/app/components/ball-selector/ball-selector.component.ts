import { Component } from '@angular/core';
import { Ball } from 'src/models/ball';
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

  addOrDeleteBall(ball: Ball){
    this.dataService.addOrDeleteBallEmitter$.emit(ball)
  }

}
