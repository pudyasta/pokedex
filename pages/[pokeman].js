import React from "react";
import Layout from "../components/Layout";

export const getStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const { results } = await res.json();
  const paths = results.map((result) => {
    return { params: { pokeman: result.name } };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const name = context.params.pokeman;
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  const data = await res.json();
  return {
    props: {
      pokemonData: data,
    },

    revalidate: 10,
  };
};

export default function Pokeman({ pokemonData }) {
  const paddedIndex = ("00" + pokemonData.id).slice(-3);
  return (
    <>
      <Layout>
        <div className="px-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl capitalize font-semibold">
            {pokemonData.name}
          </h1>
          <div className="rounded-full overflow-hidden border-4 border-blue-100 shadow-md mt-5">
            <img
              className=" w-56 h-56  "
              src={
                "http://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
                paddedIndex +
                ".png"
              }
              alt="okokok"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
