import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { Store } from './store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // browser
    BrowserModule,
    BrowserAnimationsModule,

    // service worker
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),

    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    // routing
    RouterModule.forRoot(ROUTES),

    // shared
    SharedModule.forRoot()

  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
}
