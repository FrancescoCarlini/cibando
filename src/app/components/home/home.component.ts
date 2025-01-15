import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Recipe } from '../../models/recipes.model';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('modaleRegistrazione', { static: false }) modale: ElementRef;

  evidenziato = false;

  ricette: Recipe[] = [];

  datiRegistrazione = {};

  idModale = '';

  nomeModale = '';

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response.sort((a, b) => b._id - a._id).slice(0, 4);
      },
      error: (e) => console.error(e),
    });

    this.userService.datiUtente.subscribe((res) => {
      this.datiRegistrazione = res;
      console.log(this.datiRegistrazione);
    });
  }

  ngAfterViewInit(): void {
    if (this.datiRegistrazione) {
      this.openModal(this.modale);
    }
  }

  onEvidenziazione() {
    this.evidenziato = !this.evidenziato;
  }

  openModal(content: any, id?: string, nome?: string, cognome?: string) {
    this.idModale = id;
    this.nomeModale = nome;
    this.modalService
      .open(content, {
        centered: true,
        ariaLabelledBy: 'Modale di benvenuto',
        size: 'lg',
        role: 'alertdialog',
      })
      .result.then((res) => {
        console.log('azione da eseguire ' + res);
        this.userService.datiUtente.next(null);
      })
      .catch((error) => {
        console.log('Nessuna azione da eseguire');
        this.userService.datiUtente.next(null);
      });
  }
}
