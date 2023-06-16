import { ReactNode } from "react";
import { ListSearchI } from "./interfaces";

/* eslint-disable max-len */
export const ListSearch = ({children}:ListSearchI<ReactNode>) => {
  return (
    <div className="absolute shadow bg-white top-[60px] z-40 w-full lef-0 rounded max-h-[300px] overflow-y-auto svelte-5uyqqj">
      <div className="flex flex-col w-full">
        {children}
      </div>
    </div>
  );
};
