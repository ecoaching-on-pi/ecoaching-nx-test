import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FitnessComponentsModule } from '@ecoaching-on-pi/fitness/components';
import { MaterialModule } from './material.module';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    FitnessComponentsModule,
    SharedUiModule,
    MaterialModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
