import { Component } from '@angular/core';
import { NotificationService } from '../notification-service';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-toast',
  templateUrl: './toast-componnent.html',
  styleUrls: ['./toast-componnent.scss'], 
  imports: [CommonModule]
})
export class ToastComponent {

  toasts$;

  constructor(private notification: NotificationService) {
    this.toasts$ = this.notification.toast$;
  }

  remove(id: number) {
    this.notification.remove(id);
  }

}