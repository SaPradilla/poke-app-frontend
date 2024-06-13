import { Component } from '@angular/core';
import { Observable, catchError,EMPTY,map } from 'rxjs';
import { Pokemon, ResponsePokemons } from 'src/app/core/models';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  public pokemonsList$!: Observable<Pokemon[]>;
  public errorMsg!:string;


  constructor(
    private service:PokemonService
  ){}


  ngOnInit(): void {
    this.loadPokemons();

    this.service.getAllResultsObservable().subscribe((pokemons: Pokemon[])=>{
      this.pokemonsList$ = new Observable((observer) => {
        observer.next(pokemons);
        observer.complete();
      });
    })

    this.service.getPokemonAddedObservable().subscribe(() => {
      this.loadPokemons();
    });

    this.service.getSearchResultsObservable().subscribe((pokemons: Pokemon[]) => {
      this.pokemonsList$ = new Observable((observer) => {
        observer.next(pokemons);
        observer.complete();
      });
    });
  }

  loadPokemons(): void {
    this.pokemonsList$ = this.service.getPokemons().pipe(
      map((response: ResponsePokemons) => response.body.pokemons),
      catchError((error: string) => {
        this.errorMsg = error;
        return EMPTY;
      })
    );
  }

}
