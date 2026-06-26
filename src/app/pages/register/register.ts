import { Component } from '@angular/core';
import { RegisterRequest } from '../../api/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { register } from '../../api/functions';
import { ApiConfiguration } from '../../api/api-configuration';
import { LoaderService } from '../../common/loader/loader-serviec';
import { NotificationService } from '../../common/Toast/notification-service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiConfiguration,
    private toast: NotificationService,
    private loader: LoaderService,
  ) {}
  registerRequest: RegisterRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  errorMsgs: Array<string> = [];
  register() {
    this.loader.show();
    register(this.http, this.api.rootUrl, {
      body: this.registerRequest,
    }).subscribe({
      next: (response) => {
        this.loader.hide();
        this.router.navigate(['/activate-account'], {
          replaceUrl: true,
          queryParams: { email: this.registerRequest.email },
        });
        this.toast.show('confirm your email', 'info');
      },
      error: (error) => {
        this.loader.hide();
        if (error.error.validationErrors)
          this.errorMsgs = error.error.validationErrors;
        else{
          this.errorMsgs = ["maybe this user is registered"]
        }
          for (let err of this.errorMsgs) {
            this.toast.show(err, 'error', 5000);
          }
      },
    });
  }
  login() {
    this.router.navigate(['/login']);
  }
}
