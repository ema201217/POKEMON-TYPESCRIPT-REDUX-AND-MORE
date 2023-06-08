import {
  ParametersGetPokemons,
  PromiseList,
  PromisePoke,
  getPokemonsMappedAsyncInterface,
} from './interface';
import { getPokemonParametersInclude, getUrlGetPokemons } from '../../../utils/apiHelper';
import { mappedPokemon } from '../../../utils/mappers';
import _ from 'lodash';
import { FormatPokemonLocal } from '../../../types/pokemons';
import { ParametersInclude } from '../../../utils/interface';
import { Pokemon } from 'pokenode-ts';

const getPokemons = async ({ page, limit }: ParametersGetPokemons): PromiseList => {
  const url = await getUrlGetPokemons();
  const offset = page === 1 ? 0 : page * limit;
  return fetch(`${url}?limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getPokemonByName = async (name: string): PromisePoke => {
  const url = await getUrlGetPokemons();
  return fetch(`${url}/${name}`).then((res) => res.json());
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
          const data: Pokemon = await getPokemonByName(name);
          const include: ParametersInclude[] | null = await getPokemonParametersInclude();
          const dataMapped: FormatPokemonLocal = mappedPokemon({ data, include });
          return dataMapped;
        });
        let data = await Promise.all(pokemonsPromises);
        data = _.map(data, (poke: FormatPokemonLocal) =>
          _.merge({}, poke, { image_gif: getImageGif(poke.id) })
        );
        resolve({ data, count });
      });
    } catch (error) {
      reject(error);
    }
  });

const getImageGif = (id: number): string => {
  // eslint-disable-next-line max-len
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
};
