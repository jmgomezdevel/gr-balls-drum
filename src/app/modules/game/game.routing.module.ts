import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallsDrumComponent } from './components/balls-drum/balls-drum.component';

// Guards
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'balls-drum',
  },
  {
    path: 'balls-drum',
    canActivate: [AuthGuard],
    component: BallsDrumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
