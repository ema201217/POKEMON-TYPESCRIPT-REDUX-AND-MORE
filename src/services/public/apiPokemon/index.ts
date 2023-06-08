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
import _ from 'lodash';
import { FormatPokemonLocal } from '../../../types/pokemons';
import { ParametersInclude } from '../../../utils/interface';

const P = new PokemonClient();
export const getPokemons = async ({
  page = 1,
  limit = 20,
}: ParametersGetPokemons): PromiseList => {
  const offset = limit * page;
  console.log(offset);
  return await P.listPokemons(offset, limit);
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
          const include: ParametersInclude[] | null = await getPokemonParametersInclude();
          const dataMapped: FormatPokemonLocal = mappedPokemon({ data, include });
          return dataMapped;
        });
        const data = await Promise.all(pokemonsPromises);
        const dataMap = _.map(data, (poke) =>
          _.merge({}, poke, { image_gif: getImageGif(poke.id) })
        );
        resolve({ data: dataMap, count });
      });
    } catch (error) {
      reject(error);
    }
  });

const getImageGif = (id: number): string => {
  // eslint-disable-next-line max-len
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
};
