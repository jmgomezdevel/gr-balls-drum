import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/welcome/welcome.routing.module').then(m => m.WelcomeRoutingModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./modules/game/game.routing.module').then(m => m.GameRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}