import { MatchSettings } from '../models/match-settings.model';
import { PlayerValue } from '../shared/enums/player-value.enum';
import { Board } from '../models/board.model';

export class GameUtils {

  numRows: number;
  numCols: number;
  four: number;

  constructor(settings: MatchSettings) {
    this.numRows = settings.numRows;
    this.numCols = settings.numCols;
    this.four = settings.four;
  }

  /**
   * Get a matrix filled with zeroes
   * @returns {Board}
   */
  getEmptyBoard(): Board {
    const board = [];
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        board[r] = board[r] || [];
        board[r][c] = 0;
      }
    }
    return board;
  }

  /**
   * Given a number list, returns the number which is repeated at least ${this.four} times without any series breaks
   * @param {number[]} values
   * @returns {number}
   */
  private checkLine(values: number[]) {
    let last = 0;
    let lastCount = 0;

    for (let i = 0; i < values.length; i++) {
      if (values[i] === last) {
        lastCount++;
      } else {
        last = values[i];
        lastCount = 1;
      }

      if (last !== 0 && lastCount === this.four) {
        break;
      }

    }

    if (last !== 0 && lastCount === this.four) {
      return last;
    }

    return 0;

  }

  /**
   * Given a board (number[][]) as input, return the number of the winner player
   * or null if nobody won yet
   * @param {Board} board
   * @returns {PlayerValue}
   */
  getWinnerValue(board: Board): PlayerValue {

    // horizontal check
    for (let i = 0; i < this.numRows; i++) {
      const playerValue = this.checkLine(board[i]);
      if (playerValue !== 0) {
        return playerValue;
      }
    }

    // vertical check
    for (let i = 0; i < this.numCols; i++) {
      const playerValue = this.checkLine(board.map((r, rowIndex) => {
        return board[rowIndex][i];
      }));

      if (playerValue !== 0) {
        return playerValue;
      }

    }

    /*
     * Diagonal check 1 (first left to right check)
     *
     * [x][ ][ ][ ][ ][ ][ ]
     * [x][x][ ][ ][ ][ ][ ]
     * [x][x][x][ ][ ][ ][ ]
     * [x][x][x][x][ ][ ][ ]
     * [ ][x][x][x][x][ ][ ]
     * [ ][ ][x][x][x][x][ ]
     * [ ][ ][ ][x][x][x][x]
     *
     */

    for (let i = 0; i <= this.numRows - this.four; i++) {
      let row, col;
      let values = [];

      for (row = i, col = 0; row < this.numRows && col < this.numCols; row++, col++) {
        values = [...values, board[row][col]];
      }

      const playerValue = this.checkLine(values);
      if (playerValue !== 0) {
        return playerValue;
      }

    }

    /*
     * Diagonal check 2 (last left to right check)
     *
     * [ ][x][x][x][ ][ ][ ]
     * [ ][ ][x][x][x][ ][ ]
     * [ ][ ][ ][x][x][x][ ]
     * [ ][ ][ ][ ][x][x][x]
     * [ ][ ][ ][ ][ ][x][x]
     * [ ][ ][ ][ ][ ][ ][x]
     * [ ][ ][ ][ ][ ][ ][ ]
     *
     */

    for (let i = 1; i <= this.numCols - this.four; i++) {
      let row, col;
      let values = [];

      for (row = 0, col = i; row < this.numRows && col < this.numCols; row++, col++) {
        values = [...values, board[row][col]];
      }

      const playerValue = this.checkLine(values);
      if (playerValue !== 0) {
        return playerValue;
      }

    }

    /*
     * Diagonal check 3 (first right to left check)
     *
     * [ ][ ][ ][x][x][x][x]
     * [ ][ ][x][x][x][x][ ]
     * [ ][x][x][x][x][ ][ ]
     * [x][x][x][x][ ][ ][ ]
     * [x][x][x][ ][ ][ ][ ]
     * [x][x][ ][ ][ ][ ][ ]
     * [x][ ][ ][ ][ ][ ][ ]
     *
     */

    for (let i = this.four - 1; i < this.numCols; i++) {
      let row, col;
      let values = [];

      for (row = 0, col = i; row < this.numRows && col >= 0; row++, col--) {
        values = [...values, board[row][col]];
      }

      const playerValue = this.checkLine(values);
      if (playerValue !== 0) {
        return playerValue;
      }

    }

    /*
     * Diagonal check 4 (last right to left check)
     *
     * [ ][ ][ ][ ][ ][ ][ ]
     * [ ][ ][ ][ ][ ][ ][x]
     * [ ][ ][ ][ ][ ][x][x]
     * [ ][ ][ ][ ][x][x][x]
     * [ ][ ][ ][x][x][x][ ]
     * [ ][ ][x][x][x][ ][ ]
     * [ ][x][x][x][ ][ ][ ]
     *
     */

    for (let i = 1; i <= this.numRows - this.four; i++) {
      let row, col;
      let values = [];

      for (row = i, col = this.numCols - 1; row < this.numRows && col >= 0; row++, col--) {
        values = [...values, board[row][col]];
      }

      const playerValue = this.checkLine(values);
      if (playerValue !== 0) {
        return playerValue;
      }

    }

    return null;

  }

}
