import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  public oauthToken: string;
  constructor(private authService: AuthService) { }

  onAuthenticateToTwitter() {
    this.authService.getRequestToken().subscribe(
      data => { this.oauthToken = data['oauth_token']; },
      err => console.error(err),
      () => window.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=' + this.oauthToken
    );
  }

  ngOnInit() {
  }

}
