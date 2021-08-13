import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const typeUrl = 'https://pokeapi.co/api/v2/type/';
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor(private http: HttpClient) { }


  queryPokemon(query: string): Observable<any> {
    return this.http.get<any>(typeUrl + query + '/');
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
