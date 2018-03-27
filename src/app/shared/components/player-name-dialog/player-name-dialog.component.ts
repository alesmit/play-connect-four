import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player-name-dialog',
  templateUrl: './player-name-dialog.component.html',
  styleUrls: ['./player-name-dialog.component.scss']
})
export class PlayerNameDialogComponent {

  form: FormGroup = this.fb.group({
    playerName: ['']
  });

  constructor(private dialogRef: MatDialogRef<PlayerNameDialogComponent>,
              private fb: FormBuilder) {
  }

  close() {
    this.dialogRef.close(this.form.value.playerName);
  }

}
