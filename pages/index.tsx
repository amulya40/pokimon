import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPokemons } from "../utils/api";
// import "@/styles/globals.css";


export default function Home() {
  const [pokemons, setPokemons] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPokemons().then(setPokemons);
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pokemon Application</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
            <div className="border p-4 rounded-lg hover:bg-gray-200 cursor-pointer">
              {pokemon.name.toUpperCase()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
