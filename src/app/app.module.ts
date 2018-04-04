import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
