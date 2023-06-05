import { Pokemon } from 'pokenode-ts';

export interface CacheLocal {
  configUrls: object | null;
  pokemons: Pokemon[] | never[];
  pokemonParametersInclude: ParametersInclude[] | null;
}

export interface ParametersInclude {
  key: string;
  searchProps: string;
}