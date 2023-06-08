/* eslint-disable max-len */
import { useEffect, useState, useMemo, ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getPokemonsMappedAsync } from '../../services/public/apiPokemon';
import { savePokemons } from '../../redux/slices/pokemon';
import { FormatPokemonLocal } from '../../types/pokemons';
import _ from 'lodash'; 

export function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [inputValue, setInputValue] = useState<string>('');
  const { data, count } = useSelector(({ pokemons }: RootState) => pokemons.pokemons);

  const handleChangeInputValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  useEffect(() => {
    getPokemonsMappedAsync({ limit, page }).then(({ data }) => {
      console.log(data);
      dispatch(savePokemons({ data, count }));
    });
  }, [limit, page]);

  const pagination: number[] = useMemo(() => {
    const countIteration: number = Math.floor(count / limit);
    const pages: number[] = Array.from({ length: countIteration });
    return pages;
  }, [count, limit]);

  const filterAndMapPokes = useCallback(
    () =>
      data
        ?.filter((poke: FormatPokemonLocal) =>
          inputValue ? RegExp(inputValue, 'i').test(poke.name) : true
        )
        .map(({ name, id }) => <li key={id}>{name}</li>),
    [data, inputValue]
  );

  return (
    <div>
      <button onClick={() => setLimit(2)}>limit2</button>
      <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>page -</button>
      <button
        onClick={() => {
          console.log('siguiente pagina');
          setPage(page + 1);
        }}
      >
        page +
      </button>

      <input type='text' placeholder='Buscar Poke' onChange={handleChangeInputValue} />
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
