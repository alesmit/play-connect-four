import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GameService } from './services/game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { PlayerNameDialogComponent } from './components/player-name-dialog/player-name-dialog.component';

const SHARED_MODULES = [
  MaterialModule,
  ReactiveFormsModule,
  CommonModule
];

@NgModule({
  declarations: [
    PlayerNameDialogComponent
  ],
  entryComponents: [
    PlayerNameDialogComponent
  ],
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES,
    PlayerNameDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        GameService,
        LocalStorageService
      ]
    };
  }
}
