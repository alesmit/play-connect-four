import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './containers/game/game.component';
import { BoardComponent } from './components/board/board.component';
import { HudComponent } from './components/hud/hud.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayersHudComponent } from './components/players-hud/players-hud.component';

const ROUTES: Routes = [{path: '', component: GameComponent}];

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    HudComponent,
    PlayersHudComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class GameModule {

}
