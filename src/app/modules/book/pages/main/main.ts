import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '../../componnents/menu/menu';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [RouterOutlet, Menu],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
