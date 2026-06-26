import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../loader-serviec';

@Component({
  standalone:true,
  selector: 'app-loader-componnent',
  imports: [CommonModule],
  templateUrl: './loader-componnent.html',
  styleUrl: './loader-componnent.css',
})
export class LoaderComponnent {

  loading$;

  constructor(private loaderService:LoaderService){
    this.loading$ = this.loaderService.loading$;
  }

}
