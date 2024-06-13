import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  showModal:boolean = false;

  // Modal
  openModal():void{
    this.showModal = true;
  }
  closeModal():void{
    this.showModal = false;
  }

}
