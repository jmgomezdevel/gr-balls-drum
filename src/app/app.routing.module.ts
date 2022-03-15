import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallsDrumComponent } from './components/balls-drum/balls-drum.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'balls-drum',
    canActivate: [AuthGuard],
    component: BallsDrumComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}