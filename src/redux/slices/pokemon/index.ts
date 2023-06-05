import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { PokeSliceInitialState, SavePokemonInterface } from './interface';

const initialState: PokeSliceInitialState = {
  data: [],
  loading: true,
  count: 0,
};

export const pokemonSlice: Slice<PokeSliceInitialState> = createSlice({
  initialState,
  name: 'pokemons',
  reducers: {
    savePokemons: (
      state: PokeSliceInitialState,
      action: PayloadAction<SavePokemonInterface>
    ) => {
      const pokeJSON = localStorage.getItem('pokemons');
      const pokeStorage = pokeJSON ? JSON.parse(pokeJSON) : null;
      if (pokeStorage) {
        console.log(pokeStorage);
      }
      const {
        payload: { data, count },
      } = action;

      state.data = data;
      state.count = count;
    },
  },
});

export const { savePokemons } = pokemonSlice.actions;
