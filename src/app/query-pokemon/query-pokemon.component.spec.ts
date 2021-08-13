import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPokemonComponent } from './query-pokemon.component';

describe('QueryPokemonComponent', () => {
  let component: QueryPokemonComponent;
  let fixture: ComponentFixture<QueryPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
