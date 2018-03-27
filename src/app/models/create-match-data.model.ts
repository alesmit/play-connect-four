/**
 * Information needed to start a match
 */
export interface CreateMatchData {

  /**
   * Name of the host player
   */
  player1Name: string;

  /**
   * Number of desired rows
   */
  boardNumRows: number;

  /**
   * Number of desired columns
   */
  boardNumCols: number;

  /**
   * Minimum number of marks in series required to win a match
   */
  four: number;

  /**
   * Determine whether to show (or not) the mark placeholder
   * on column hover before placing a mark
   */
  ghostHelper: boolean;

}
