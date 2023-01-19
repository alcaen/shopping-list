import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../utils/api";

interface ItemModalProps {
  isOpen: Dispatch<SetStateAction<boolean>>;
}

const ItemModal: FC<ItemModalProps> = ({ isOpen }) => {
  const [itemName, setItemName] = useState<string>("");
  const addItem = api.items.addItem.useMutation();

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/75">
      <div className=" relative z-10 flex w-96 flex-col space-y-5 rounded-lg bg-gray-100 p-5">
        <h3 className="font text-xl font-medium ">Name of item:</h3>
        <input
          type="text"
          className="rounded-md border-2 border-gray-800 px-2 py-1"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 font-semibold">
          <button
            className="rounded-lg bg-green-600 py-2 transition hover:bg-green-700"
            onClick={() => {
              addItem.mutate({ name: itemName });
              isOpen(false);
            }}
          >
            Add
          </button>
          <button
            className="rounded-lg bg-red-600 py-2  transition hover:bg-red-700"
            onClick={() => isOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
