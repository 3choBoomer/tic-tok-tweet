import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {
  oauth_token: string;
  oauth_verifier: string;
  constructor(private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.mergeMap(params => {
      this.oauth_token = params['oauth_token'];
      this.oauth_verifier = params['oauth_verifier'];
      return this._authService.getAccessToken(this.oauth_token, this.oauth_verifier);
    })
    .subscribe( accessTokenResponse => {
      console.log(accessTokenResponse);
    });
  }

}
