import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageData } from '../../models/local-storage-data.model';
import { PlayerRole } from '../enums/player-role.enum';

@Injectable()
export class LocalStorageService {

  constructor(private db: AngularFireDatabase) {

  }

  /**
   * Key to use in window.localStorage
   * @type {string}
   */
  private readonly STORAGE_ID = environment.firebaseConfig.authDomain;

  /**
   * Check whether local storage data has been initialized in the past.
   * If not, store the initial data: player GUID and an empty object
   * to store the role played for each match
   */
  init(): void {
    if (!this.get()) {

      const initialData: LocalStorageData = {
        playerId: this.db.createPushId(), // use firebase to generate a uuid
        match: {}
      };

      localStorage.setItem(this.STORAGE_ID, JSON.stringify(initialData));

    }
  }

  private get(): LocalStorageData {
    const data = localStorage.getItem(this.STORAGE_ID);
    return JSON.parse(data) || null;
  }

  setMyRoleForMatch(matchId: string, role: PlayerRole) {
    const data = this.get();
    data.match[matchId] = role;
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(data));
  }

  getMyRoleForMatch(matchId: string): PlayerRole {
    const data = this.get();
    const role = data.match[matchId];
    if (role === null || role === undefined) {
      return null;
    }
    return role;
  }

  getPlayerId(): string {
    const {playerId} = this.get();
    return playerId;
  }

}
