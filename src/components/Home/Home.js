import React from "react";
import { Link } from "react-router-dom";
import { BsFillTriangleFill } from "react-icons/bs";

export default function Home() {
  return (
    <main>
      <section className="h-full flex flex-col items-center justify-around bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80')]">
        <h1 className="text-white flex">
          Welcome to &nbsp;
          <BsFillTriangleFill />
          &nbsp;windbnb
        </h1>
        <Link to="/stays">
          <button className="bg-white rounded-xl w-32 h-16 font-bold text-salmon animate-bounce shadow-xl">
            See stays !
          </button>
        </Link>
      </section>
    </main>
  );
}
