/* eslint-disable max-len */
import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeFilterAbility, keywordUpdate } from "../../../redux/slices/pokemon";
import { InputSearchI } from "./interfaces";
import { RootState } from "../../../redux/store";

export const InputSearch = ({ onShowList, showList }: InputSearchI) => {
  const { entityActiveFilter } = useSelector(
    ({ pokemons }: RootState) => pokemons.pokemons
  );
  const dispatch = useDispatch();
  const handleKeyword: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) =>
    dispatch(keywordUpdate({ keyword: value }));

  const handleIsFilterAbility: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => dispatch(activeFilterAbility({ checked }));

  return (
    <div className="w-full">
      <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
        <div className="flex flex-auto flex-wrap"></div>
        <input
          placeholder={`Search by ${
            entityActiveFilter === "pokemons" ? "Pokemon" : "Ability"
          }`}
          onChange={handleKeyword}
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
        <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
          {entityActiveFilter === "ability" && (
            <button
              className={`cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none ${
                showList && "rotate-180"
              }`}
              onClick={onShowList}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-up w-4 h-4"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center ms-2">
          <input type="checkbox" onChange={handleIsFilterAbility} />
          <label className="whitespace-nowrap">Filter ability</label>
        </div>
      </div>
    </div>
  );
};
