import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ParametersGetPokemons } from '../../services/public/apiPokemon/interface';
import { getPokemonsMappedAsync } from '../../services/public/apiPokemon';
import { savePokemons } from '../../redux/slices/pokemon';

export function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const { data, count } = useSelector(({ pokemons }: RootState) => pokemons.pokemons);

  const getPokes = async ({ page, limit }: ParametersGetPokemons) => {
    const data = await getPokemonsMappedAsync({ page, limit });
    dispatch(savePokemons(data));
  };

  useEffect(() => {
    getPokes({ page, limit });
  }, [page, limit]);

  const pagination: number[] = useMemo(() => {
    const countIteration: number = Math.floor(count / limit);
    const pages: number[] = Array.from({ length: countIteration });
    return pages;
  }, [count, limit]);

  return (
    <div>
      <button onClick={() => setLimit(2)}>limit2</button>
      <button onClick={() => setPage(2)}>page2</button>
      <ul>
        {pagination.map((_, i: number) => {
          return <li key={i}>{i + 1}</li>;
        })}
      </ul>
      <ul>
        {data.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
      <ul>
        {data.map(({ image, id }) => {
          return <img width={40} key={id} src={image} />;
        })}
      </ul>
    </div>
  );
}
