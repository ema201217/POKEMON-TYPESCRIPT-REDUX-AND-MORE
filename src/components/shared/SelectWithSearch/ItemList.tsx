import { useDispatch } from "react-redux";
import { ItemListI } from "./interfaces";
import { toggleAbilityCheckbox } from "../../../redux/slices/pokemon";
import { ChangeEventHandler } from "react";

/* eslint-disable max-len */
export const ItemList = ({ name }: ItemListI<string, string>) => {
  const dispatch = useDispatch();
  const handleAbilityChecked: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked, id },
  }) => dispatch(toggleAbilityCheckbox({ checked, nameAbility: id }));

  return (
    <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div className="w-6 flex flex-col items-center">
          <div className="flex relative justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
            <input type="checkbox" id={name} onChange={handleAbilityChecked} />
          </div>
        </div>
        <label htmlFor={name} className="w-full items-center flex">
          <div className="mx-2 -mt-1">
            {name}
          </div>
        </label>
      </div>
    </div>
  );
};
