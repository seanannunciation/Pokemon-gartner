import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonTable } from '../pokemon-object';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-query-pokemon',
  templateUrl: './query-pokemon.component.html',
  styleUrls: ['./query-pokemon.component.css']
})
export class QueryPokemonComponent implements OnInit {

  @Output() public pokemonData: EventEmitter<PokemonTable[]> = new EventEmitter<PokemonTable[]>();
  searchResults = [];
  pokemonArray = [];
  pokemonObjectArray: PokemonTable[] = [];
  querySearch: string = '';
  localStorageArray = [];
  tempPokemonArray = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  // get 'search' type pokemon 
  getTypes() {
    this.pokemonArray = [];
    const sub = this.pokemonService.queryPokemon(this.querySearch)
      .subscribe({
        next: (res) => {
          this.searchResults = res;
          this.pokemonArray = res.pokemon;
          this.getPokemonData();
        },
        error: (err) => {
          console.dir(err);
        },
        complete: () => {
        }     
      });
  }

  // populate pokemon array and check for duplicates
  getPokemonData(){
    this.localStorageArray = JSON.parse(window.localStorage.getItem('QuerySearch')) ? JSON.parse(window.localStorage.getItem('QuerySearch')) : [];
    this.pokemonArray.forEach( val => {
      const subData =  this.pokemonService.getPokemon(val.pokemon.url)
      .subscribe({
        next: (res) => {
          let type = '';
          if(res.types.length > 1) {
            type = res.types.map( val => val.type.name).join(' > ');
          } else {
            type = res.types[0].type.name;
          }
          const pokemonObj: PokemonTable = {
            id: res.id,
            name: res.name,
            type: type,
            moves: res.moves.length,
            img: res.sprites.other['official-artwork'].front_default,
            url: val.pokemon.url || res.species.url
          }

          if(Array.isArray(this.localStorageArray) && this.localStorageArray.length){
            const dupIndex = this.localStorageArray.findIndex((x)=> x.name==pokemonObj.name);
            if(dupIndex != -1) {
              this.localStorageArray[dupIndex] = pokemonObj;
            } else {
              this.localStorageArray.push(pokemonObj);
            }
          } else {
            this.localStorageArray.push(pokemonObj);
          }
        },
      error: (err) => {
        console.dir(err);
      },
      complete: () => {
        this.outputData();
      }
      });
    });
    
    
  }

  // emit pokemon array to parent to be displayed
  outputData(){
    window.localStorage.setItem('QuerySearch', JSON.stringify(this.localStorageArray));
    this.pokemonData.emit(this.localStorageArray); 
  }



}
