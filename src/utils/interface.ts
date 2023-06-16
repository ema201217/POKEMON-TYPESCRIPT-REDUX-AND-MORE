import { Pokemon } from "pokenode-ts";

export interface CacheLocal {
  configUrls: object | null;
  pokemons: Pokemon[] | never[];
  pokemonParametersInclude: ParametersInclude[] | null;
  abilityParametersInclude: ParametersInclude[] | null;
  pokemonsUrl: string | null;
  abilityUrl: string | null;
}

export interface ParametersInclude {
  key: string;
  searchProps: string;
}
