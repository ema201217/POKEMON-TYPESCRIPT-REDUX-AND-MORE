import { FormatPokemonLocal } from '../../../types/pokemons';

export interface PokeSliceInitialState {
  data: FormatPokemonLocal[];
  loading: boolean;
  count: number;
}

export interface SavePokemonInterface {
  data: FormatPokemonLocal[];
  count: number;
}
