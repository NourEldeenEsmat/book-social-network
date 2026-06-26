import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id:number;
  message:string;
  type:'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toasts:Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  toast$ = this.toastSubject.asObservable();

  show(message:string,type:'success'|'error'|'info'='info',period:number=3000){

    const toast:Toast={
      id:Date.now(),
      message,
      type,
    }

    this.toasts.push(toast);
    this.toastSubject.next(this.toasts);

    setTimeout(()=>{
      this.remove(toast.id)
    },period)

  }

  remove(id:number){
    this.toasts = this.toasts.filter(t=>t.id!==id);
    this.toastSubject.next(this.toasts);
  }

}