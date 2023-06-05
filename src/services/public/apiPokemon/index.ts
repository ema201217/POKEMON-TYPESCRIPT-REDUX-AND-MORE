import { PokemonClient } from 'pokenode-ts';
import {
  ParametersGetPokemon,
  ParametersGetPokemons,
  PromiseList,
  PromisePoke,
  getPokemonsMappedAsyncInterface,
} from './interface';
import { ID_POKEMONS, NAME_POKEMONS } from '../../../constants';
import { getPokemonParametersInclude } from '../../../utils/apiHelper';
import { mappedPokemon } from '../../../utils/mappers';

const P = new PokemonClient();
export const getPokemons = ({
  page = 1,
  limit = 20,
}: ParametersGetPokemons): PromiseList => {
  const offset = limit * page;
  return P.listPokemons(offset, limit);
};

export const getPokemon = ({
  by = 'name',
  valueNum = ID_POKEMONS.IVYSUAR,
  valueStr = NAME_POKEMONS.IVYSUAR,
}: ParametersGetPokemon): PromisePoke => {
  if (by === 'name') {
    return P.getPokemonByName(valueStr);
  }
  return P.getPokemonById(valueNum);
};

export const getPokemonsMappedAsync = ({
  limit,
  page,
}: ParametersGetPokemons): Promise<getPokemonsMappedAsyncInterface> =>
  new Promise((resolve, reject) => {
    try {
      getPokemons({
        limit,
        page,
      }).then(async ({ count, results }) => {
        const pokemonsPromises = results.map(async ({ name }) => {
          const data = await getPokemon({ valueStr: name });
          const include = await getPokemonParametersInclude();
          const dataMapped = mappedPokemon({ data, include });
          return dataMapped;
        });
        const data = await Promise.all(pokemonsPromises);
        resolve({ data, count });
      });
    } catch (error) {
      reject(error);
    }
  });
