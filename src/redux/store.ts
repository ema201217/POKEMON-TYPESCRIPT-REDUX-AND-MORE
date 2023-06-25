import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { pokemonSlice } from "./slices/pokemon";

export interface RootState {
  pokemons: ReturnType<typeof rootReducer>;
}

const rootReducer = combineReducers({
  pokemons: pokemonSlice.reducer,
});

const store: Store = configureStore({
  reducer: { pokemons: rootReducer },
});

export default store;
