import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private _router:Router) { 
  }

  /* This method will navigate to the game route 
  *
  * @return void
  */
  public goGame() : void{
    this._router.navigate(['balls-drum'])
  }

}
