import { ItemListI } from "./interfaces";

/* eslint-disable max-len */
export const ItemList = ({ index }: ItemListI<string>) => {
  return (
    <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div className="w-6 flex flex-col items-center">
          <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
            <img
              className="rounded-full"
              alt="A"
              src="https://randomuser.me/api/portraits/men/62.jpg"
            />{" "}
          </div>
        </div>
        <div className="w-full items-center flex">
          <div className="mx-2 -mt-1">
            {index}
          </div>
        </div>
      </div>
    </div>
  );
};
