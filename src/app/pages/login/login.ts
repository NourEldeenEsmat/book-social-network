import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../../api/models';
import { authentication } from '../../api/functions';
import { TokenService } from '../../api/token/token-service';
import { ApiConfiguration } from '../../api/api-configuration';
import { NotificationService } from '../../common/Toast/notification-service';
import { LoaderService } from '../../common/loader/loader-serviec';
import { LoaderComponnent } from '../../common/loader/loader-componnent/loader-componnent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponnent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  constructor(
    private token: TokenService,
    private api: ApiConfiguration,
    private http: HttpClient,
    private toast: NotificationService,
    private loader: LoaderService,
    private router: Router,
  ) {}
  authRequest: AuthRequest = { email: '', password: '' };
  errorMsgs: Array<string> = [];
  register() {
    window.location.href = '/register';
  }
  login() {
    this.loader.show();
    this.errorMsgs = [];
    this.token.removeToken();
    authentication(this.http, this.api.rootUrl, {
      body: this.authRequest,
    }).subscribe({
      next: (response) => {
        this.token.setToken(response.body?.token || '');
        this.router.navigate(['/books']);
        this.toast.show('Login Successefully', 'success');
        this.loader.hide();
      },
      error: (error) => {
        this.loader.hide();
        if (error.error.validationErrors) {
          this.errorMsgs = error.error.validationErrors;
        } else {
          this.errorMsgs.push(
            error.error.error || 'An error occurred during login.',
          );
        }
        this.toast.show(this.errorMsgs[0], 'error');
      },
    });
  }
}
