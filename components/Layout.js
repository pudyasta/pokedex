import React from "react";
import Head from "next/head";
export default function Layout({ title, children }) {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="container mx-auto max-w-xl pt-3 min-h-screen">
        <div className="container py-6   bg-gray-50 mx-auto shadow-md mt-8 rounded">
          <h3 className="text-center text-4xl   relative mb-8">
            NextJS Pokedex
          </h3>
          {children}
        </div>
      </main>
    </div>
  );
}
