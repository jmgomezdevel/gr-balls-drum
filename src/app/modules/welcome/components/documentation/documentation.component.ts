import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent {

  constructor(private _router:Router) { 
    console.log(1)
  }

  /* This method will navigate to the game route 
  *
  * @return void
  */
  public goGame() : void{
    this._router.navigate(['/game/balls-drum'])
  }

}
