import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Board } from './models/board.model';
import { Player } from './models/player.model';
import { Players } from './models/players.model';
import { MatchSettings } from './models/match-settings.model';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

export const StateProps = {
  matchId: 'matchId',
  board: 'board',
  activePlayer: 'activePlayer',
  winnerPlayer: 'winnerPlayer',
  players: 'players',
  settings: 'settings'
};

interface State {
  matchId: string;
  board: Board;
  activePlayer: Player;
  winnerPlayer: Player;
  players: Players;
  settings: MatchSettings;
}

const initialState = {
  matchId: undefined,
  board: undefined,
  activePlayer: undefined,
  winnerPlayer: undefined,
  players: undefined,
  settings: undefined,
};

@Injectable()
export class Store {

  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, val: any) {
    this.subject.next({
      ...this.value,
      [name]: val
    });
  }

}
