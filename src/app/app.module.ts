import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent     } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HeaderComponent  } from './pokemon/header/header.component';

import { MatButtonModule  } from '@angular/material/button';
import { MatIconModule    } from '@angular/material/icon';
import { MatInputModule   } from '@angular/material/input';
import { MatSelectModule  } from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ListComponent } from './pokemon/list/list.component';
import { CardComponent } from './pokemon/card/card.component';
import { ModalDetailsComponent } from './pokemon/modal-details/modal-details.component';
import { ModalAddComponent } from './pokemon/modal-add/modal_add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './pokemon/modal-add/form/form.component';
import { PokemonService } from './core/services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    HeaderComponent,
    ListComponent,
    CardComponent,
    ModalDetailsComponent,
    ModalAddComponent,
    FormComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,

  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
