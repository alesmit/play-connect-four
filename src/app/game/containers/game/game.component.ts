import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StateProps, Store } from '../../../store';
import { GameService } from '../../../shared/services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GameUtils } from '../../game-utils';
import { MatDialog } from '@angular/material';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { PlayerNameDialogComponent } from '../../../shared/components/player-name-dialog/player-name-dialog.component';
import { Player } from '../../../models/player.model';
import { Board } from '../../../models/board.model';
import { Players } from '../../../models/players.model';
import { MatchSettings } from '../../../models/match-settings.model';
import { PlayerValue } from '../../../shared/enums/player-value.enum';
import { DEFAULTS } from '../../../defaults';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  matchId$ = this.store.select<string>(StateProps.matchId);

  board$: Observable<Board> = this.store.select<Board>(StateProps.board);
  activePlayer$: Observable<Player> = this.store.select<Player>(StateProps.activePlayer);
  winnerPlayer$: Observable<Player> = this.store.select<Player>(StateProps.winnerPlayer);
  players$: Observable<Players> = this.store.select<Players>(StateProps.players);
  settings$: Observable<MatchSettings> = this.store.select<MatchSettings>(StateProps.settings);

  private subscription: Subscription;

  private gameUtils: GameUtils;

  currentPlayer: Player;

  loading: boolean;

  constructor(private store: Store,
              private storage: LocalStorageService,
              private gameService: GameService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.loading = true;

    this.subscription = this.route.params
      .switchMap(({id}) => this.gameService.matchExists(id))
      .switchMap(matchId => {

        if (!matchId) {
          return Observable.throw('Match not found');
        }

        this.gameService.setMatchId(matchId);
        return this.gameService.settings$().first();

      })
      .switchMap((settings: MatchSettings) => {

        // init game utils
        this.gameUtils = new GameUtils(settings);

        // subscribe to main objects
        return Observable.combineLatest([
          this.gameService.activePlayer$(),
          this.gameService.winnerPlayer$(),
          this.gameService.players$().do(() => this.playersUpdated()),
          this.gameService.board$().do(() => this.boardUpdated()),
        ]);

      })
      .subscribe(
        () => this.loading = false,
        () => {

          // match does not exist, redirect
          this.loading = false;
          this.router.navigate(['/']);

        }
      );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private boardUpdated(): void {

    /*
     * run only when both players are playing
     * (exit if there's already a winner or the min players count hasn't been reached yet)
     */

    if (this.store.value.winnerPlayer || this.playersCount < 2) {
      return;
    }

    /*
     * check the board to see if there's a winner.
     * if there's no winner then change turn
     * otherwise end the match (will set the winner to db)
     */

    const board = this.store.value.board;
    const winnerValue = this.gameUtils.getWinnerValue(board);

    if (winnerValue === null) {
      this.changeTurn();

    } else {

      const winnerPlayer = this.getPlayerByValue(winnerValue);
      this.gameService.endMatch(winnerPlayer);

    }

  }

  private getPlayerByValue(val: PlayerValue): Player {
    return Object
      .keys(this.store.value.players)
      .map(id => this.store.value.players[id])
      .find(player => player.value === val);
  }

  private playersUpdated(): void {

    // identify my role for this match (check localStorage)
    const currentRole = this.storage.getMyRoleForMatch(this.gameService.matchId);

    // if I have no role and there aren't 2 players yet, I become the player 2
    if (currentRole === null && this.playersCount < 2) {

      // prompt player 2 to get his nickname
      this.dialog
        .open(PlayerNameDialogComponent)
        .afterClosed()
        .subscribe(name => {

          const player2Name = name || DEFAULTS.player2Name;
          this.gameService
            .setMeAsPlayer2(player2Name)
            .then(() => this.setCurrentPlayer());

        });

    } else {
      this.setCurrentPlayer();
    }

  }

  private setCurrentPlayer(): void {
    const id = this.storage.getPlayerId();
    this.currentPlayer = this.store.value.players[id];
  }

  get playersCount(): number {
    try {
      return Object.keys(this.store.value.players).length;
    } catch (e) {
      return 0;
    }
  }

  get isMyTurn(): boolean {
    try {
      return this.currentPlayer.id === this.store.value.activePlayer.id;
    } catch (e) {
      return false;
    }
  }

  onMark({row, col}: { row: number, col: number }): void {
    const board = [...this.store.value.board];
    board[row][col] = this.currentPlayer.value;
    this.gameService.setBoard(board);
  }

  private getEnemyPlayer(): Player {

    const enemyPlayerId = Object
      .keys(this.store.value.players)
      .find(id => id !== this.storage.getPlayerId());

    return this.store.value.players[enemyPlayerId];

  }

  private changeTurn() {

    // deny the other player to change turn for me
    // also, exit if i didn't move yet
    if (!this.isMyTurn) {
      return;
    }

    const enemyPlayer = this.getEnemyPlayer();
    return this.gameService.setActivePlayer(enemyPlayer);

  }

}
