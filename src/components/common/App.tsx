/* eslint-disable max-len */
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getPokemonsMappedAsync } from "../../services/public/apiPokemon";
import { savePokemons } from "../../redux/slices/pokemon";
import { FormatPokemonLocal } from "../../types/pokemons";
import _ from "lodash";
import { SelectWithSearch } from "../shared/SelectWithSearch";

export function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const { pokemons, count, keyword, abilityFilter, entityActiveFilter } = useSelector(
    ({ pokemons }: RootState) => pokemons.pokemons
  );

  useEffect(() => {
    getPokemonsMappedAsync({ limit, page }).then(({ data }) =>
      dispatch(savePokemons({ pokemons: data, count }))
    );
  }, [limit, page]);

  // const pagination: number[] = useMemo(() => {
  //   const countIteration: number = Math.floor(count / limit);
  //   const pages: number[] = Array.from({ length: countIteration });
  //   return pages;
  // }, [count, limit]);

  const filterByPokemons = ({ name }: FormatPokemonLocal) =>
    keyword ? RegExp(keyword, "i").test(name) : true;

  const filterByAbility = ({ abilities }: FormatPokemonLocal) =>
    abilityFilter.length
      ? abilities.some((ability) => abilityFilter.includes(ability))
      : true;

  const filterAndMapPokes = useCallback(
    () =>
      pokemons
        ?.filter(entityActiveFilter === "pokemons" ? filterByPokemons : filterByAbility)
        .map(({ name, id }) => <li key={id}>{name}</li>),
    [pokemons, keyword, entityActiveFilter, abilityFilter]
  );

  return (
    <div className="">
      <SelectWithSearch />
      {/* <button onClick={() => setLimit(2)}>limit2</button>
      <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>page -</button>
      <button onClick={() => setPage(page + 1)}>page +</button> */}

      {/* <ul>
        {pagination.map((_, i: number) => {
          return <li key={i}>{i + 1}</li>;
        })}
      </ul>*/}
      <ul>{filterAndMapPokes()}</ul>
      {/*  <ul>
        {data.map(({ image_gif, id, image_default }) => {
          return (
            <>
              <img width={40} key={id} src={image_default} />
              <img width={40} key={id} src={image_gif} />
            </>
          );
        })}
      </ul> */}
    </div>
  );
}
