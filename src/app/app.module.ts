import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BallsDrumComponent } from './modules/game/components/balls-drum/balls-drum.component';
import { BallSelectorComponent } from './modules/game/components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './modules/game/components/bet-slip/bet-slip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BallsDrumComponent,
    BallSelectorComponent,
    BetSlipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
