import { CacheLocal, ParametersInclude } from "./interface";

// Cache local
const constantData: CacheLocal = {
  configUrls: null,
  pokemons: [],
  pokemonParametersInclude: null,
  abilityParametersInclude: null,
  pokemonsUrl: null,
  abilityUrl: null,
};

export const clearCache = (): void => {
  constantData.configUrls = null;
  constantData.pokemons = [];
  constantData.pokemonParametersInclude = null;
  constantData.abilityParametersInclude = null;
  constantData.pokemonsUrl = null;
  constantData.abilityUrl = null;
};

export const getConfigUrls = async (): Promise<any> => {
  constantData.configUrls =
    constantData.configUrls ||
    (await fetch("/config/index.json").then((urls) => urls.json()));
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

export const getAbilityParametersInclude = async (): Promise<
  ParametersInclude[] | null
> => {
  constantData.abilityParametersInclude =
    constantData.abilityParametersInclude ||
    (await getConfigUrls()).mappers.mappedAbility.include;
  return constantData.abilityParametersInclude;
};

export const getUrlGetPokemons = async (): Promise<string> => {
  if (!constantData.pokemonsUrl) {
    const {
      url: {
        base,
        getPokemons: {
          params: { pokemon },
        },
      },
    } = await getConfigUrls();

    constantData.pokemonsUrl = constantData.pokemonsUrl || `${base}${pokemon}`;
  }
  return constantData.pokemonsUrl;
};

export const getUrlGetAbility = async (): Promise<string> => {
  if (!constantData.abilityUrl) {
    const {
      url: {
        base,
        getPokemons: {
          params: { ability },
        },
      },
    } = await getConfigUrls();

    constantData.abilityUrl = constantData.abilityUrl || `${base}${ability}`;
  }
  return constantData.abilityUrl;
};
