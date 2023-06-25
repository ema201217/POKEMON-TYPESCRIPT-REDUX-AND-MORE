import { useEffect, useState } from "react";
import { InputSearch } from "./InputSearch";
import { ListSearch } from "./ListSearch";
import { ItemList } from "./ItemList";
import { getAbilityMappedAsync } from "../../../services/public/apiPokemon";
import { FormatAbilityLocal } from "../../../types/pokemons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

/* eslint-disable max-len */
export const SelectWithSearch = () => {
  const [ability, setAbility] = useState<FormatAbilityLocal[]>([]);
  const { keyword, entityActiveFilter } = useSelector(
    ({ pokemons }: RootState) => pokemons.pokemons
  );
  const [showList, setShowList] = useState<boolean>(false);

  const handleShowList = () => setShowList(!showList);

  const filterNamesEntity = ({ name }: FormatAbilityLocal): boolean =>
    keyword ? name.includes(keyword) : true;

  useEffect(() => {
    getAbilityMappedAsync({ limit: 1000, page: 1 }).then((data) => {
      setAbility(data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="xl:w-full md:w-2/4 flex flex-col items-center h-64">
        <div className="w-full px-4">
          <div className="flex flex-col items-center relative">
            <InputSearch onShowList={handleShowList} showList={showList} />
            {(!!keyword || showList) && entityActiveFilter === "ability" && (
              <ListSearch>
                {ability.filter(filterNamesEntity).map(({ name }) => {
                  return <ItemList name={name} key={name} id={name} />;
                })}
              </ListSearch>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
