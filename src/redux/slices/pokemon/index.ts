import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  ActiveFilterAbilityInterface,
  KeywordUpdateInterface,
  PokeSliceInitialState,
  SavePokemonInterface,
  ToggleAbilityCheckboxInterface,
} from "./interface";

const initialState: PokeSliceInitialState = {
  pokemons: [],
  loading: true,
  count: 0,
  keyword: "",
  entityActiveFilter: "pokemons",
  abilityFilter: [],
};

export const pokemonSlice: Slice<PokeSliceInitialState> = createSlice({
  initialState,
  name: "pokemons",
  reducers: {
    savePokemons: (
      state: PokeSliceInitialState,
      action: PayloadAction<SavePokemonInterface>
    ) => {
      const { pokemons, count } = action.payload;
      state.pokemons = pokemons;
      state.count = count;
    },
    keywordUpdate: (
      state: PokeSliceInitialState,
      action: PayloadAction<KeywordUpdateInterface>
    ) => {
      const { keyword } = action.payload;
      state.keyword = keyword?.toLowerCase();
    },
    activeFilterAbility: (
      state: PokeSliceInitialState,
      action: PayloadAction<ActiveFilterAbilityInterface>
    ) => {
      const { checked } = action.payload;
      state.entityActiveFilter = checked ? "ability" : "pokemons";
    },
    toggleAbilityCheckbox: (
      state: PokeSliceInitialState,
      action: PayloadAction<ToggleAbilityCheckboxInterface>
    ) => {
      const { checked, nameAbility } = action.payload;
      if (!checked) {
        state.abilityFilter = state.abilityFilter.filter(
          (id: string) => id !== nameAbility
        );
      } else {
        state.abilityFilter = [...state.abilityFilter, nameAbility];
      }
    },
  },
});

export const { savePokemons, keywordUpdate, activeFilterAbility, toggleAbilityCheckbox } =
  pokemonSlice.actions;
