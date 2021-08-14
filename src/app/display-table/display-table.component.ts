import {  Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PokemonTable } from '../pokemon-object';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  @Input() pokemonTable: PokemonTable[];
  @Output() pokemonTableChange = new EventEmitter<PokemonTable[]>();
  pokemonData = [];
  displayedColumns: string[] = ['name', 'type', 'moves', 'img','url'];
  searchStorage: string;
  searchData: PokemonTable[] = [];
  storageTable: PokemonTable[] = [];
  saveButtonEnabled = false;
  editedName = '';
  searchCount = 0;
  search: boolean= false;
  tableData:PokemonTable[] =[];
  saveEnable = false;
  editIndex = null;
  columnKey: string = 'name';
  descOrder: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getPokemonData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPokemonData(changes.pokemonTable.currentValue); 
  }

  // updating the storage and table data
  getPokemonData( updated? ) {
    this.search = false;
    if(updated){
      this.pokemonTable = updated;
      this.storageTable = updated;
    } else {
      this.storageTable = JSON.parse(window.localStorage.getItem('QuerySearch'));
      this.pokemonTable = this.storageTable;
    }
    
  }

  // search event 
  searchPokemon(event: any) {
    this.search = true;
    const searchText = event.target.value;
    this.searchData = JSON.parse(window.localStorage.getItem('QuerySearch'));
    const tempTable = this.searchData.filter( val => val.name.includes(searchText));
    this.searchCount = tempTable.length;
    this.pokemonTable = tempTable;

  }

  // delete function 
  remove(pokemon: PokemonTable) {
    const temp = JSON.parse(window.localStorage.getItem('QuerySearch'));
    temp.splice(temp.findIndex(x => x.id === pokemon.id),1);
    window.localStorage.setItem('QuerySearch',JSON.stringify(temp));
    this.storageTable = temp;
    this.pokemonTable = temp;
  }

  // update function
  updateRow(row, i, event) {
    
    this.getPokemonData();
    this.editedName = '';
    if(event != ''){
      this.editedName = event.target.value;
      const objIndex = this.storageTable.findIndex(x => x.id === row.id);
      this.storageTable[objIndex].name = event.target.value;
      this.updateTable(this.storageTable);
    }
  }

  save(pokemon, event) {
    console.log(pokemon);
    console.log(event);
  }

  updateTable( tableData: PokemonTable[] ) {
    window.localStorage.setItem('QuerySearch', JSON.stringify(tableData));
  }


  onSort(column){
    
    this.columnKey = column;
    this.descOrder = !this.descOrder ;
  }

}
