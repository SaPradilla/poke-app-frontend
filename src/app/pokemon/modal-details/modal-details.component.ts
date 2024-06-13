import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from 'src/app/core/models';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
})
export class ModalDetailsComponent {

  @Output() toggle = new EventEmitter<void>()

  public pokemonView:Pokemon|null = this.pokemonService.pokemonSelected

  constructor(
    private pokemonService: PokemonService
  ){}

  closeModal(){
    this.toggle.emit();
    this.pokemonService.clearPokemonSelected();
  }
}
