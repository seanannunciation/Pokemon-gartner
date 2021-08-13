import { Component } from '@angular/core';
import { PokemonTable } from './pokemon-object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gartner-pokemon';

  pokemonArray: PokemonTable[] = [];

  getPokemonData( event: PokemonTable[]) {
    this.pokemonArray = event; 
  }



}
