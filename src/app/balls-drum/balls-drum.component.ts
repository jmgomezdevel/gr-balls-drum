import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ball } from 'src/models/ball';
import { Bet } from 'src/models/bet';
import { User } from 'src/models/user';
import { DataService } from 'src/services/data.service';
import { BallSelectorComponent } from '../ball-selector/ball-selector.component';

@Component({
  selector: 'app-balls-drum',
  templateUrl: './balls-drum.component.html',
  styleUrls: ['./balls-drum.component.scss']
})
export class BallsDrumComponent implements OnInit {

  @Input() n_balls: number = 10;
  @Input() max_selection: number = 8;

  constructor(
    public dataService: DataService
  ) { 
    this.dataService.initDrum(this.n_balls, this.max_selection)
  }

  ngOnInit(): void {

  }

}
