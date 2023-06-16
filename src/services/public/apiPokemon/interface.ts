import { NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { FormatAbilityLocal, FormatPokemonLocal } from "../../../types/pokemons";
export interface ParametersURL {
  page: number;
  limit: number;
}

export interface getPokemonsMappedInterface {
  data: FormatPokemonLocal[];
  count: number;
}
