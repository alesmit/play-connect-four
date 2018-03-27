import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { PlayerValue } from '../../../shared/enums/player-value.enum';
import { MatchSettings } from '../../../models/match-settings.model';
import { Player } from '../../../models/player.model';
import { PlayerRole } from '../../../shared/enums/player-role.enum';
import { Board } from '../../../models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  playerValue = PlayerValue;

  @Input()
  board: Board;

  @Input()
  settings: MatchSettings;

  @Input()
  isDisabled: boolean;

  @Input()
  winnerPlayer: Player;

  @Input()
  currentPlayer: Player;

  @ViewChild('tableEl')
  tableEl: ElementRef;

  @Output()
  mark = new EventEmitter<{ row: number; col: number; }>();

  constructor(private renderer: Renderer2) {

  }

  onCellClick(row: number, col: number) {
    if (this.isDisabled) {
      return;
    }

    this.clearHoverState(row, col);
    this.mark.emit(this.getTargetCell(col));
  }

  /**
   * Find the first empty cell where to place the mark
   * @param {number} col
   * @param {number} i
   * @returns {any}
   */
  private getTargetCell(col: number, i = 1) {
    const numRows = this.settings.numRows;
    const row = numRows - i;

    if (this.board[row][col] === 0) {
      return {row, col};

    } else if (i < numRows) {
      i++;
      return this.getTargetCell(col, i);
    }
  }

  private clearHoverState(row: number, col: number) {

    // disable all hover styling and behaviors
    this.highlightColumn(col, false);
    this.setGhostMark(col, false);

  }

  onCellHover(row: number, col: number, enable: boolean) {
    if (!this.isDisabled) {
      this.highlightColumn(col, enable);
      this.setGhostMark(col, enable);
    }
  }

  private highlightColumn(colIndex: number, enable: boolean) {
    const selectorClassName = `.td-col${colIndex}`;
    const highlightClassName = 'highlight';
    const list = this.tableEl.nativeElement.querySelectorAll(selectorClassName);

    for (let i = 0; i < list.length; i++) {
      const el = list.item(i);

      if (enable) {
        this.renderer.addClass(el, highlightClassName);
      } else {
        this.renderer.removeClass(el, highlightClassName);
      }
    }

  }

  /**
   * Control the visibility of the mark placeholder before placing it
   * @param {number} colIndex
   * @param {boolean} enable
   */
  private setGhostMark(colIndex: number, enable: boolean) {
    if (!this.settings.ghostHelper) {
      return;
    }

    const targetCell = this.getTargetCell(colIndex);

    if (targetCell && targetCell.row >= 0) {

      const {row, col} = targetCell;
      const selectorClassName = `.cell-row${row}.cell-col${col}`;
      const ghostClassName = this.currentPlayer.role === PlayerRole.Player1 ? 'player1-ghost' : 'player2-ghost';
      const el = this.tableEl.nativeElement.querySelector(selectorClassName);

      if (enable) {
        this.renderer.addClass(el, ghostClassName);
      } else {
        this.renderer.removeClass(el, ghostClassName);
      }
    }

  }

}
