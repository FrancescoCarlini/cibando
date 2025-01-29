import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RECIPES_CATEGORY } from '../../../models/category.const';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements DoCheck {
  isCollapsed = true;

  user: User;

  categorie = RECIPES_CATEGORY;

  modelRicerca = {
    categoriaSelezionata: '',
    text: '',
    difficulty: 1,
  };

  constructor(private router: Router, public authService: AuthService) {}

  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  searchRecipes() {
    localStorage.setItem('filters', JSON.stringify(this.modelRicerca));
    this.router.navigateByUrl('ricette');
  }
}
