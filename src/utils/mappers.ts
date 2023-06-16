import { Pokemon } from "pokenode-ts";
import _ from "lodash";
import { FormatAbilityLocal, FormatPokemonLocal } from "../types/pokemons";
import { ParametersInclude } from "./interface";

interface ParametersMapped {
  data: Pokemon | any;
  include: ParametersInclude[] | null;
}

// Conditional Type
type FormatLocal<T extends "pokemon" | "ability"> = T extends "pokemon"
  ? FormatPokemonLocal
  : FormatAbilityLocal;

export const mappedObjEntity = <T extends "pokemon" | "ability">({
  data,
  include = null,
}: ParametersMapped): FormatLocal<T> => {
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
