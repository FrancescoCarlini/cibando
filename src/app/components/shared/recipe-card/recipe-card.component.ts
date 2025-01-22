import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-card',
  standalone: false,

  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  private sanitizer = inject(DomSanitizer);
  @Input() recipe: Recipe | undefined;
  @Input() page: string;

  @Output() messaggio = new EventEmitter();

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
}
