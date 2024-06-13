import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePokemons,ResponsePokemon,Pokemon } from '../models';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private pokemonAddedSubject = new Subject<void>();
  private searchResultsSubject = new Subject<Pokemon[]>();
  private getAllResultsSubject = new Subject<Pokemon[]>();

  pokemonSelected:Pokemon | null = null;

  constructor(
    private http:HttpClient
    ) {}


  setPokemonSelected(pokemon:Pokemon){
    this.pokemonSelected = pokemon;
  }
  clearPokemonSelected(){
    this.pokemonSelected = null;
  }

  getPokemons():Observable<ResponsePokemons> {
    return this.http.get<ResponsePokemons>(`${environment.BASE_URL}/pokemons`).pipe(
      tap((response:ResponsePokemons)=>{
        this.getAllResultsSubject.next(response.body.pokemons);
      })
    )
  }
  getPokemon(id:string):Observable<ResponsePokemon>{
    return this.http.get<ResponsePokemon>(`${environment.BASE_URL}/pokemons/${id}`)
  }
  addPokemon(data:Pokemon){
    return this.http.post<Pokemon>(`${environment.BASE_URL}/pokemons`,data).pipe(
      tap(()=>{
        this.pokemonAddedSubject.next()
      })
    )
  }
  getPokemonAddedObservable(): Observable<void> {
    return this.pokemonAddedSubject.asObservable();
  }
  getSearchResultsObservable(): Observable<Pokemon[]> {
    return this.searchResultsSubject.asObservable();
  }
  getAllResultsObservable(): Observable<Pokemon[]> {
    return this.getAllResultsSubject.asObservable();
  }
  searchPokemons(field: string, value: string): Observable<any> {
    console.log({field,value});

    let params = new HttpParams().set(field, value);
    console.log(params);

    return this.http.get<any>(`${environment.BASE_URL}/pokemons/search`, { params }).pipe(
      tap((response: any) => {
        this.searchResultsSubject.next(response.pokemons);
      })
    );
  }
}
