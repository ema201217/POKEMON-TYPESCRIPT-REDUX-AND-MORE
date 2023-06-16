import { ChangeEventHandler, useEffect, useState } from "react";
import { InputSearch } from "./InputSearch";
import { SelectWithSearchI } from "./interfaces";
import { ListSearch } from "./ListSearch";
import { ItemList } from "./ItemList";
import { getAbilityMappedAsync } from "../../../services/public/apiPokemon";
import { FormatAbilityLocal } from "../../../types/pokemons";

/* eslint-disable max-len */
export const SelectWithSearch = ({ onChange }: SelectWithSearchI<ChangeEventHandler>) => {
  const [ability, setAbility] = useState<FormatAbilityLocal[]>([]);
  const getData = async () => {
    const data = await getAbilityMappedAsync({ limit: 1000, page: 1 });
    setAbility(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="xl:w-full md:w-1/4 flex flex-col items-center h-64">
        <div className="w-full px-4">
          <div className="flex flex-col items-center relative">
            <InputSearch onChange={onChange} />
            <ListSearch>
              {/* TEMPLATE */}
              {ability.map(({ name }) => {
                return <ItemList index={name} key={name} />;
              })}
            </ListSearch>
          </div>
        </div>
      </div>
    </div>
  );
};
