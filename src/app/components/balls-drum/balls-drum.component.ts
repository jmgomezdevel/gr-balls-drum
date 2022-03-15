import { Component} from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-balls-drum',
  templateUrl: './balls-drum.component.html',
  styleUrls: ['./balls-drum.component.scss']
})
export class BallsDrumComponent {

  public n_balls: number = 10;
  public max_selection: number = 8;
  
  constructor(
    public dataService: DataService
  ) { 
    this.dataService.initDrum(this.n_balls, this.max_selection)
  }

}
