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
  styleUrls: ['./oauth-callback.component.css'],
  styles: [
    '.show{ opacity: 1 !important; }',
    '.zeroOpacity { opacity: 0; transition: .5s ease-in-out all; }'
  ]
})
export class OauthCallbackComponent implements OnInit {
  screenName: string;
  invalidScheduledTime = true;
  tweetScheduled = false;
  oauthToken: string;
  oauthSecret: string;
  tweetText: string;
  selectedDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  selectedTime: NgbTimeStruct = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes() + 1,
    second: undefined
  };
  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  showForm = false;

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .mergeMap(params => {
        const oauthToken = params['oauth_token'];
        const oauthVerifier = params['oauth_verifier'];
        return this._authService.getAccessToken(oauthToken, oauthVerifier);
      })
      .subscribe(accessTokenResponse => {
        if (accessTokenResponse.screen_name) {
          this.showForm = true;
          this.oauthToken = accessTokenResponse.oauth_token;
          this.oauthSecret = accessTokenResponse.oauth_token_secret;
          this.screenName = accessTokenResponse.screen_name;
        }
      });
  }

  validate() {
    const scheduledTime = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day,
      this.selectedTime.hour,
      this.selectedTime.minute
    );
    if (new Date() < scheduledTime && this.tweetText) {
      this.invalidScheduledTime = false;
    } else {
      this.invalidScheduledTime = true;
    }
  }
  onScheduleTweet() {
    const scheduledTime = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day,
      this.selectedTime.hour,
      this.selectedTime.minute
    );
    const body = {
      dateTime: scheduledTime,
      oauthToken: this.oauthToken,
      oauthSecret: this.oauthSecret,
      screenName: this.screenName,
      tweetText: this.tweetText
    };
    this.scheduleService.scheduleTweet(body).subscribe(res => {
      this.tweetScheduled = true;
      // quick animation without having to dig through tons of angular docs to figure that out
      setTimeout(() => {
        this.tweetScheduled = false;
      }, 3000);
    });
  }
}
