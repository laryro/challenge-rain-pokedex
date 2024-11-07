import { Pokemon } from "../types/pokemon";

interface UseFilterByNameProps {
  pokemons: Pokemon[];
  name: string;
}

export const useFilterByName = ({ pokemons, name }: UseFilterByNameProps) => {
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );
  return filteredPokemons;
};
