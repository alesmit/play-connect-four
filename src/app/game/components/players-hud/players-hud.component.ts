import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../../../models/player.model';
import { PlayerRole } from '../../../shared/enums/player-role.enum';

@Component({
  selector: 'app-players-hud',
  templateUrl: './players-hud.component.html',
  styleUrls: ['./players-hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersHudComponent {

  @Input()
  players: { [id: string]: Player };

  @Input()
  activePlayer: Player;

  playerRole = PlayerRole;

  get playerIds() {
    if (!this.players) {
      return [];
    }

    return Object.keys(this.players);

  }

}
