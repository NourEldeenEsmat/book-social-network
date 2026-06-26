import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-rate',
  imports: [CommonModule],
  templateUrl: './rate.html',
  styleUrl: './rate.scss',
})
export class Rate {
  @Input() rate: number = 0;
  maxRate: number = 5;

  get fullStars(): number {
    return Math.floor(this.rate);
  }
  get halfStar(): boolean {
    return this.rate % 1 !== 0;
  }
  get emptyStars(): number {
    return this.maxRate - Math.ceil(this.rate);
  }
}
