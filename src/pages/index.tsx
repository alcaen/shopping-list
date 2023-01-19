import type { ShoppingList } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { useState } from "react";
import ItemModal from "../components/itemModal";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const [items, setItems] = useState<ShoppingList[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const getItems = api.items.getAll.useQuery(undefined, {
    onSuccess(items) {
      setItems(items);
    },
  });

  // With OnMutate you're changing the state before the succes change on DB is faster.
  const deleteItem = api.items.deleteItem.useMutation({
    onMutate: (deletedItem) => {
      setItems((prev) => prev.filter((item) => item.id != deletedItem.id));
    },
  });

  const updateItem = api.items.checkItem.useMutation({
    onMutate: (checkedItem) => {
      const theOne = items.map((item) => {
        if (item.id == checkedItem.id) {
          item.checked = !item.checked;
        }
        return item;
      });
      setItems(theOne);
    },
  });

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta
          name="description"
          content="A shopping list created with t3 stack."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalOpen && <ItemModal isOpen={setModalOpen} />}

      <main className="flex min-h-screen flex-col items-center justify-start space-y-10 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mt-10 flex w-3/4 justify-between">
          <h1 className="text-3xl font-semibold text-gray-300">
            My Shopping List
          </h1>
          <button
            type="button"
            className="h-10 rounded-lg bg-cyan-500 px-4 text-center text-2xl font-semibold transition hover:scale-105 hover:bg-cyan-600"
            onClick={() => setModalOpen(true)}
          >
            Add item
          </button>
        </div>

        <ul className=" min-w-[400px] font-medium text-gray-300">
          {items.length ? (
            items.map((item) => (
              <li key={item.id} className="border-[1px] border-white">
                <div className="flex items-center justify-between">
                  <span
                    className="group ml-2 flex h-[40px] flex-auto cursor-pointer items-center"
                    onClick={() =>
                      updateItem.mutate({
                        id: item.id,
                        checked: item.checked,
                      })
                    }
                  >
                    {item.checked ? (
                      <div className="absolute h-[2px] w-[350px] border-[1px] border-gray-300 group-hover:invisible"></div>
                    ) : (
                      <div className="invisible absolute h-[2px] w-[350px] border-[1px] border-gray-300 transition group-hover:visible group-hover:border-dashed"></div>
                    )}
                    {item.name}
                  </span>
                  <div
                    className="flex min-h-[40px] w-10 cursor-pointer items-center justify-center text-lg transition hover:scale-125"
                    onClick={() => deleteItem.mutate({ id: item.id })}
                  >
                    X
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="text-2xl font-semibold text-white">Loading...</div>
          )}
        </ul>
      </main>
    </>
  );
};

export default Home;
