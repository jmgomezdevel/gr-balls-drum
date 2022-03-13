import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallsDrumComponent } from './balls-drum/balls-drum.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/balls-drum',
  },
  {
    path: 'balls-drum',
    component: BallsDrumComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
