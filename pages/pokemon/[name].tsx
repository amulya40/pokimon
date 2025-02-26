import { GetStaticProps, GetStaticPaths } from "next";
import { fetchPokemonDetails, fetchPokemons } from "../../utils/api";

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  if (!pokemon) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">{pokemon.name.toUpperCase()}</h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto my-4 w-60 h-50 object-contain rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
        />
        <h2 className="text-xl font-semibold text-gray-700">Abilities</h2>
        <ul className="text-gray-600">
          {pokemon.abilities.map((a: any) => (
            <li key={a.ability.name} className="capitalize bg-gray-200 p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 mb-4">
              {a.ability.name}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold text-gray-700">Stats</h2>
        <ul className="text-gray-600">
          {pokemon.stats.map((s: any) => (
            <li key={s.stat.name} className="flex justify-between bg-gray-200 p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 mb-4">
              <span className="capitalize">{s.stat.name}</span>
              <span className="font-semibold text-gray-800">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await fetchPokemons();
  const paths = pokemons?.map((p: any) => ({ params: { name: p.name } })) || [];

  return { paths, fallback: "blocking" }; // Ensures Next.js waits for data before showing the page
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.name) {
    return { notFound: true };
  }
  try {
    const pokemon = await fetchPokemonDetails(params.name as string);
    if (!pokemon || !pokemon.name) {
      return { notFound: true };
    }
    return { props: { pokemon } };
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return { notFound: true };
  }
};
