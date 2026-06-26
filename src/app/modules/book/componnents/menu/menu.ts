import { Component, OnInit } from '@angular/core';
import { BookRoutingModule } from '../../book-routing-module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../../api/token/token-service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [BookRoutingModule, FormsModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  constructor(
    private token: TokenService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.getUserName()
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (window.location.href.endsWith(link.getAttribute('href')!)) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
  searchTerm: string = '';
  userName=''
  getUserName(){
    this.userName=this.token.getUsernameFromToken(this.token.getToken()||'')||''
  }
}
