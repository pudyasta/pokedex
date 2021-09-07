import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ posts }) {
  return (
    <>
      <Layout>
        {posts.map((post, index) => (
          <Link href={"/" + post.name} key={index}>
            <a>
              <div className="content w-full border-l-4 hover:border-blue-400 p-4 flex my-5 bg-gray-100 border-gray-100 items-center">
                <div className="rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                  <img src={post.image} className=" w-32 mr-5 " />
                </div>
                <div className="content-review ml-6">
                  <h3 className="text-xl capitalize">{post.name}</h3>
                  <p className=" text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta, fugit.
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const { results } = await res.json();

  const pokemon = results.map((result, index) => {
    const paddedIndex = ("00" + (index + 1)).slice(-3);
    const image = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    return {
      ...result,
      image,
    };
  });

  return {
    props: {
      posts: pokemon,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
