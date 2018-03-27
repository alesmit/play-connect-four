import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './containers/credits/credits.component';

const ROUTES: Routes = [{path: '', component: CreditsComponent}];

@NgModule({
  declarations: [CreditsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CreditsModule {

}
