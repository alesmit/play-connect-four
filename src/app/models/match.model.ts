import { Player } from './player.model';
import { MatchSettings } from './match-settings.model';
import { Players } from './players.model';
import { Board } from './board.model';

/**
 * Match state representation
 */
export interface Match {

  /**
   * Match ID
   */
  id: string;

  /**
   * Board matrix used to play the match
   */
  board: Board;

  /**
   * Creation timestamp
   */
  startAt: any;

  /**
   * End match timestamp
   */
  endAt: any;

  /**
   * Who won the match
   */
  winnerPlayer: Player;

  /**
   * Who is up to play (useless when the match is over)
   */
  activePlayer: Player;

  /**
   * Match players
   */
  players: Players;

  /**
   * Match preferences
   */
  settings: MatchSettings;

}
