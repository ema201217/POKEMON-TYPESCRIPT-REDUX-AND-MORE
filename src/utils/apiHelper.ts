import { CacheLocal, ParametersInclude } from './interface';

// Cache local
const constantData: CacheLocal = {
  configUrls: null,
  pokemons: [],
  pokemonParametersInclude: null,
};

export const clearCache = (): void => {
  constantData.configUrls = null;
  constantData.pokemons = [];
  constantData.pokemonParametersInclude = null;
};

export const getConfigUrls = async (): Promise<any> => {
  constantData.configUrls =
    constantData.configUrls ||
    (await fetch('/config/index.json').then((urls) => urls.json()));
  return constantData.configUrls;
};

export const getPokemonParametersInclude = async (): Promise<
  ParametersInclude[] | null
> => {
  constantData.pokemonParametersInclude =
    constantData.pokemonParametersInclude ||
    (await getConfigUrls()).mappers.mappedPokemon.include;
  return constantData.pokemonParametersInclude;
};