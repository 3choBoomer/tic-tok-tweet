import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time-struct';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {
  oauthToken: string;
  oauthVerifier: string;
  selectedDate: NgbDateStruct;
  selectedTime: NgbTimeStruct = {hour: (new Date()).getHours(), minute: (new Date()).getMinutes() + 1, second: undefined};
  minDate: NgbDateStruct = {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()};
  showForm = false;
  constructor(private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.mergeMap(params => {
      console.log(params);
      this.oauthToken = params['oauth_token'];
      this.oauthVerifier = params['oauth_verifier'];
      return this._authService.getAccessToken(this.oauthToken, this.oauthVerifier);
    }).subscribe( accessTokenResponse => {
      if (accessTokenResponse.screen_name) {
        this.showForm = true;
      }
    });
  }

}
