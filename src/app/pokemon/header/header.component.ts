import { Component,EventEmitter,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() open = new EventEmitter<void>();

  selected:string = 'name';
  filterForm!: FormGroup;


  constructor(private service:PokemonService){}


  ngOnInit(): void {
    this.filterForm = new FormGroup({
      selected: new FormControl('name', [Validators.required]),
      value: new FormControl(null)
    });

    this.filterForm.get('value')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(), 
      switchMap(value => {
        const selected = this.filterForm.get('selected')?.value;
        if (!value) {
          return this.service.getPokemons();
        } else {
          return this.service.searchPokemons(selected, value);
        }
      })
    ).subscribe();
  }


  onOpen():void{
    
    this.open.emit();

  }

}
