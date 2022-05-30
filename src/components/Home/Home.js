import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-b from-salmon to-yellow-300 h-full flex flex-col items-center justify-around">
        <h1 className="text-white">Welcome to windbnb</h1>
        <Link to="/stays">
          <button className="bg-white rounded-xl w-32 h-16 font-bold text-salmon">
            See stays !
          </button>
        </Link>
      </section>
    </main>
  );
}
