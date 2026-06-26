import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../api/api-configuration';
import { confirm } from '../../api/functions';
import { CodeInputModule } from 'angular-code-input';

@Component({
  standalone: true,
  selector: 'app-activate-account',
  imports: [CommonModule, FormsModule, CodeInputModule, RouterLink],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount {
  constructor(
    private http: HttpClient,
    private api: ApiConfiguration,
  ) {}
  isActivated: boolean = false;
  isOkay: boolean = true;
  message: string = '';
  onCodeCompleted(code: string) {
    confirm(this.http, this.api.rootUrl, { token: code }).subscribe({
      next: () => {
        this.message =
          'Your account has been activated successfully! You can now log in.';
        this.isActivated = true;
      },
      error: () => {
        this.message =
          'Invalid activation code. Please check the code and try again.';
        this.isActivated = true;
        this.isOkay = false;
      },
    });
  }
}
