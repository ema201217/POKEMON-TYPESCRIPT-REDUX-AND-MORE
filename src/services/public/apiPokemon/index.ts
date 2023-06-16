import {
  ParametersURL,
  getPokemonsMappedInterface,
} from "./interface";
import {
  getAbilityParametersInclude,
  getPokemonParametersInclude,
  getUrlGetAbility,
  getUrlGetPokemons,
} from "../../../utils/apiHelper";
import { mappedObjEntity } from "../../../utils/mappers";
import _ from "lodash";
import { FormatAbilityLocal, FormatPokemonLocal } from "../../../types/pokemons";
import { ParametersInclude } from "../../../utils/interface";
import { NamedAPIResourceList, Pokemon } from "pokenode-ts";

const getPokemons = async ({
  page,
  limit,
}: ParametersURL): Promise<NamedAPIResourceList> => {
  const url = await getUrlGetPokemons();
  const offset = page === 1 ? 0 : page * limit;
  return fetch(`${url}?limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const url = await getUrlGetPokemons();
  return fetch(`${url}/${name}`).then((res) => res.json());
};

export const getPokemonsMappedAsync = ({
  limit,
  page,
}: ParametersURL): Promise<getPokemonsMappedInterface> =>
  new Promise((resolve, reject) => {
    try {
      getPokemons({
        limit,
        page,
      }).then(async ({ count, results }) => {
        const pokemonsPromises = results.map(async ({ name }) => {
          const data: Pokemon = await getPokemonByName(name);
          const include: ParametersInclude[] | null = await getPokemonParametersInclude();
          const dataMapped: FormatPokemonLocal = mappedObjEntity<"pokemon">({
            data,
            include,
          });
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

export const getImageGif = (id: number): string => {
  // eslint-disable-next-line max-len
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
};

// export get
export const getAbility = async ({
  limit,
  page,
}: ParametersURL): Promise<NamedAPIResourceList> => {
  const url = await getUrlGetAbility();
  const offset = page === 1 ? 0 : page * limit;
  return fetch(`${url}?limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getAbilityMappedAsync = async ({
  limit,
  page,
}: ParametersURL): Promise<FormatAbilityLocal[]> => {
  const { results } = await getAbility({ limit, page });
  const dataMappedArr: Promise<FormatAbilityLocal>[] = results.map(async (ability) => {
    const include = await getAbilityParametersInclude();
    const dataMapped: FormatAbilityLocal = mappedObjEntity<"ability">({
      data: ability,
      include,
    });
    return dataMapped;
  });
  return Promise.all(dataMappedArr);
};
