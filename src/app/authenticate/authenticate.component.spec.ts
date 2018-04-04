import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateComponent ],
      imports: [HttpClientModule],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
