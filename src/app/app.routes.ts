import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: './start/start.module#StartModule'
  },
  {
    path: 'credits',
    loadChildren: './credits/credits.module#CreditsModule'
  },
  {
    path: ':id',
    loadChildren: './game/game.module#GameModule'
  }
];
