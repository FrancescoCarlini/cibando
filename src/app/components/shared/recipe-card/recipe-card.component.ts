import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from '../../../services/recipe.service';
import { ToastService } from '../../../services/toast.service';
import { take } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-recipe-card',
  standalone: false,

  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent implements AfterContentInit {
  private sanitizer = inject(DomSanitizer);
  private modalService = inject(NgbModal);
  private recipeService = inject(RecipeService);
  private toastService = inject(ToastService);

  @ViewChild('modaleElimina', { static: false }) modale: ElementRef;

  @Input() recipe: Recipe;
  @Input() page: string;

  @Output() messaggio = new EventEmitter();
  @Output() preferito = new EventEmitter();

  user: User;

  isPreferite = false;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngAfterContentInit(): void {
    this.checkPreferite();
  }

  checkPreferite() {
    if (this.user?.preferite?.length) {
      const ricetta = this.user.preferite.find(
        (idRicetta) => idRicetta === this.recipe._id
      );
      if (ricetta) {
        this.isPreferite = true;
      }
    }
  }

  inviaTitolo(title: string) {
    this.messaggio.emit(title);
  }

  getSanitizedHtml(desc: string): SafeHtml {
    const tagliaDescrizione = this.accorciaDescrizione(desc);
    return this.sanitizer.bypassSecurityTrustHtml(tagliaDescrizione);
  }

  accorciaDescrizione(desc: string): string {
    const maxLength = 200;
    if (desc.length <= maxLength) {
      return desc.slice(0, maxLength);
    } else {
      const ultimaPosizioneSpazio = desc.lastIndexOf(' ', maxLength);
      return desc.slice(0, ultimaPosizioneSpazio) + '...';
    }
  }

  modificaPreferito() {
    this.isPreferite = !this.isPreferite;
    this.preferito.emit({
      idRicetta: this.recipe._id,
      isPreferite: this.isPreferite,
    });
  }

  cancella(content: any) {
    this.modalService
      .open(content, {
        centered: true,
        ariaLabelledBy: 'Conferma cancellazione',
        size: 'lg',
        role: 'alertdialog',
      })
      .result.then((res) => {
        if (res) {
          this.recipeService
            .deleteRicetta(this.recipe._id.toString())
            .pipe(take(1))
            .subscribe({
              next: (res) => {
                this.toastService.toastSuccesso(
                  'La ricetta è stata eliminata con successo'
                );
              },
              error: (e) => {
                this.toastService.toastErrore('Qualcosa è andato storto');
                console.error(e);
              },
            });
        }
      })
      .catch((e) => console.log(e));
  }
}
