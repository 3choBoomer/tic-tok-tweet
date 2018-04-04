import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AuthService, HttpClientModule, HttpClient]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'tic-tok-tweet'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('tic-tok-tweet');
  }));
});
