import { FormatPokemonLocal } from "../../../types/pokemons";

export interface PokeSliceInitialState {
  pokemons: FormatPokemonLocal[];
  loading: boolean;
  count: number;
  keyword: string;
  entityActiveFilter: string;
  abilityFilter: string[];
}

export interface SavePokemonInterface {
  pokemons: FormatPokemonLocal[];
  count: number;
}

export interface KeywordUpdateInterface {
  keyword: string;
}

export interface ActiveFilterAbilityInterface {
  checked: boolean;
}

export interface ToggleAbilityCheckboxInterface {
  checked: boolean;
  nameAbility: string;
}
