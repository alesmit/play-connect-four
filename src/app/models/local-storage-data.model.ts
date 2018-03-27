import { PlayerRole } from '../shared/enums/player-role.enum';

/**
 * Data stored in window.localStorage[appId]
 */
export interface LocalStorageData {

  /**
   * Player GUID
   */
  playerId: string;

  /**
   * Played matches with respective role (if was host or guest player)
   */
  match: {
    [matchId: string]: PlayerRole;
  };

}
