import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../auth.service';
import { OauthCallbackComponent } from './oauth-callback.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OauthCallbackComponent', () => {
  let component: OauthCallbackComponent;
  let fixture: ComponentFixture<OauthCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthCallbackComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
