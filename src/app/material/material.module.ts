import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatDialogModule,
} from '@angular/material';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressBarModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {

}
