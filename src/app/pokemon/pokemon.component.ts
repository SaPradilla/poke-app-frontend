import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
})
export class PokemonComponent {

  showModalAddPokemon:boolean = false;
  showModalPokemon:boolean = false;

  // Modal

  toggleModalAddPokemon():void{
    this.showModalAddPokemon = !this.showModalAddPokemon;
  }
  toggleModalPokemon():void{
    this.showModalPokemon = !this.showModalPokemon;
  }


}
