import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { FormatPokemonLocal } from '../../../types/pokemons';
export interface ParametersGetPokemons {
  page: number;
  limit: number
}

export type PromiseList = Promise<NamedAPIResourceList>;

export type PromisePoke = Promise<Pokemon>;

export interface getPokemonsMappedAsyncInterface {
  data: FormatPokemonLocal[];
  count: number;
}