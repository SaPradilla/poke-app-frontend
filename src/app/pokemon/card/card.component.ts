import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/core/models';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() pokemon! : Pokemon;
  @Output() toggle = new EventEmitter<void>();

  constructor(
    private pokemonService: PokemonService
  ){}

  viewPokemon() {
    this.pokemonService.setPokemonSelected(this.pokemon);
    console.log(this.pokemon);
    this.toggle.emit();
  }
}
