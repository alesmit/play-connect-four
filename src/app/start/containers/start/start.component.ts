import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerNameDialogComponent } from '../../../shared/components/player-name-dialog/player-name-dialog.component';
import { GameService } from '../../../shared/services/game.service';
import { Router } from '@angular/router';
import { CreateMatchData } from '../../../models/create-match-data.model';
import { DEFAULTS } from '../../../defaults';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(private dialog: MatDialog,
              private router: Router,
              private gameService: GameService) {

  }

  newGame() {

    // prompt the user to ask about his nickname
    const dialogRef = this.dialog.open(PlayerNameDialogComponent);

    dialogRef.afterClosed().subscribe((player1Name: string) => {

      // define match settings.
      // doing it in this step so that in the future they could be defined by the host player

      const data: CreateMatchData = {
        player1Name: player1Name || DEFAULTS.player1Name,
        boardNumCols: DEFAULTS.boardNumCols,
        boardNumRows: DEFAULTS.boardNumRows,
        four: DEFAULTS.four,
        ghostHelper: DEFAULTS.enableGhostHelper
      };

      this.gameService
        .createMatch(data)
        .then(matchId => this.router.navigate([`/${matchId}`]));

    });

  }

}
