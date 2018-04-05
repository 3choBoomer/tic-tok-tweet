import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ScheduleService } from './schedule.service';


const appRoutes: Routes = [
  {path: 'oauthCallback', component: OauthCallbackComponent},
  {path: 'authenticate', component: AuthenticateComponent},
  {path: '', redirectTo: '/authenticate', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    OauthCallbackComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
