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
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {
  screenName: string;
  invalidScheduledTime: boolean;
  oauthToken: string;
  oauthSecret: string;
  tweetText: string;
  selectedDate: NgbDateStruct;
  selectedTime: NgbTimeStruct = {hour: (new Date()).getHours(), minute: (new Date()).getMinutes() + 1, second: undefined};
  minDate: NgbDateStruct = {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()};
  showForm = false;

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.mergeMap(params => {
      console.log(params);
      const oauthToken = params['oauth_token'];
      const oauthVerifier = params['oauth_verifier'];
      return this._authService.getAccessToken(oauthToken, oauthVerifier);
    }).subscribe( accessTokenResponse => {
      if (accessTokenResponse.screen_name) {
        this.showForm = true;
        this.oauthToken = accessTokenResponse.oauth_token;
        this.oauthSecret = accessTokenResponse.oauth_token_secret;
        this.screenName = accessTokenResponse.screen_name;
      }
    });
  }

  onScheduleTweet() {
    const scheduledTime = new Date(this.selectedDate.year,
      this.selectedDate.month - 1, this.selectedDate.day,
      this.selectedTime.hour, this.selectedTime.minute);
    if (new Date() >= scheduledTime) {
      this.invalidScheduledTime = true;
      return;
    }
    this.invalidScheduledTime = false;
    const body = {
      'dateTime': scheduledTime,
      'oauthToken': this.oauthToken,
      'oauthSecret': this.oauthSecret,
      'screenName': this.screenName,
      'tweetText': this.tweetText
     };
    this.scheduleService.scheduleTweet(body).subscribe();


  }

}
