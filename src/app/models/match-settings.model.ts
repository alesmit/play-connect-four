/**
 * Match preferences
 */
export interface MatchSettings {

  /**
   * Board rows
   */
  numRows: number;

  /**
   * Board columns
   */
  numCols: number;

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
