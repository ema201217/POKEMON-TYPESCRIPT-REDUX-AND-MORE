import { Pokemon } from 'pokenode-ts';
import _ from 'lodash';
import { FormatPokemonLocal } from '../types/pokemons';
import { ParametersInclude } from './interface';

interface MappedPokemonParameters {
  data: Pokemon | any;
  include: ParametersInclude[] | null;
}

export const mappedPokemon = ({
  data,
  include = null,
}: MappedPokemonParameters): FormatPokemonLocal => {
  const newObj: any = {};
  if (include) {
    include.forEach(({ key, searchProps }: ParametersInclude) => {
      let valueProp = _.get(data, searchProps);
      if (Array.isArray(data[key])) {
        valueProp = data[key].map((obj: any) => _.get(obj, searchProps));
      }
      newObj[key] = valueProp;
    });
    return newObj;
  }
  return data;
};
