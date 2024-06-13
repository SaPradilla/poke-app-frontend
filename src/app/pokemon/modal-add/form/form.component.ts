import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, startWith } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { pokemonCategories, pokemonAbilities, pokemonTypes,pokemonList } from 'src/assets/static';
import { Pokemon, PokemonsStatic } from 'src/app/core/models';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() close = new EventEmitter<void>();


  enableFormStats:boolean = false;
  animateFormStats:boolean = false;
  completedFirstForm:boolean = false;
  pokeForm!: FormGroup;
  filteredCategories: Observable<string[]> | null = null;
  filteredPokemonsImageList!: Observable<PokemonsStatic[]> ;
  categories: string[] = pokemonCategories;
  types: string[] = pokemonTypes;
  abilities: string[] = pokemonAbilities;
  pokemonsImageList: PokemonsStatic[] = pokemonList;
  errorMsg!:string 
  confirmModal:boolean = false;
  loading:boolean = false;


  constructor(private service:PokemonService){}



  ngOnInit() {
    this.pokeForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(3)]),
      pknum: new FormControl(null, [Validators.required, Validators.min(1),Validators.max(99999),Validators.pattern('^[0-9]*$')]),
      weight: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*$')]),
      height: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*$')]),
      image_url: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      abilities: new FormControl([], [Validators.required]),
      types: new FormControl([], [Validators.required]),
      stats: new FormGroup({
        hp: new FormControl(0, [Validators.required]),
        attack: new FormControl(0, [Validators.required]),
        defense: new FormControl(0, [Validators.required]),
        sp_attack: new FormControl(0, [Validators.required]),
        sp_defense: new FormControl(0, [Validators.required]),
        speed: new FormControl(0, [Validators.required])
      })
    });
    // Escucha los cambios en el estado del formulario
    this.pokeForm.statusChanges.subscribe(status => {
      if (status === 'VALID' && this.areNonStatsFieldsValid()) {
        this.completedFirstForm = true;
      }
    });
    
    this.filteredCategories = this.pokeForm.get('category')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || '')),
    );

    this.filteredPokemonsImageList = this.pokeForm.get('image_url')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterImages(value || '')),
    );
  }


  toggleModalFormStats():void{
    this.enableFormStats = !this.enableFormStats;

  }

  // enviar form
  onSubmit(): void {
    
    if (this.pokeForm.valid) {
      this.loading = true;
      let pokemon:Pokemon;
      const img:string = this.pokeForm.get('image_url')?.value
      pokemon = {
        ...this.pokeForm.value,
        image_url: environment.URL_IMAGE_POKEMON + img + '.png'
      };
      this.createPokemon(pokemon)

  

    }
  }

  createPokemon(data:Pokemon){

    this.service.addPokemon(data).pipe(
      catchError((error:string)=>{
        this.errorMsg = error;
        return EMPTY;
      })
    ).subscribe(()=>{
      this.loading = false;
      this.close.emit();
    });

  }

  // Verificar si los campos excepto 'stats' son válidos
  areNonStatsFieldsValid(): boolean {
    const { stats, ...nonStatsFields } = this.pokeForm.controls;
    return Object.values(nonStatsFields).every(control => control.valid);
  }
  // Texto del los slider
  formatLabel(value: number): string {
    return value >= 1000 ? Math.round(value / 1000) + '' : `${value}`;
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterImages(name: string): PokemonsStatic[] {
    const filterValue = name.toLowerCase();

    return this.pokemonsImageList.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  toggleConfirm():void{
    this.confirmModal = !this.confirmModal;
  }

}