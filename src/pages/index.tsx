// import type { ShoppingList } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { useState } from "react";
import ItemModal from "../components/itemModal";

import { api } from "../utils/api";

const Home: NextPage = () => {
  // const [items, setItem] = useState<ShoppingList[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const items = api.items.getAll.useQuery();

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
          {items.data
            ? items.data.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center border-[1px] border-white p-2"
                >
                  <span>{item.name}</span>
                </li>
              ))
            : "Loading..."}
        </ul>
      </main>
    </>
  );
};

export default Home;
