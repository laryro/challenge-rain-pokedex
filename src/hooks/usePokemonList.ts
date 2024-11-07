import { useState, useEffect } from "react";
import { Pokemon, PokemonListResponseResult } from "../types/pokemon";
import {
  getPokemonByType,
  getPokemonDetails,
  getPokemonList,
} from "../api/pokemon";
import { useFiltersContext } from "../contexts/filters";

export const intersectPokemons = (
  list1: Pokemon[],
  list2: Pokemon[]
): Pokemon[] => {
  const set2 = new Set(list2.map((pokemon) => pokemon.id));
  return list1.filter((pokemon) => set2.has(pokemon.id));
};

export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { filters } = useFiltersContext();

  const fetchAllPokemon = async () => {
    const { results } = await getPokemonList();
    const detailedPromises = results.map((pokemon: PokemonListResponseResult) =>
      getPokemonDetails(pokemon.url)
    );
    const detailedPokemon = await Promise.all(detailedPromises);

    return detailedPokemon;
  };

  const type = filters.type;

  useEffect(() => {
    const filterPokemons = async () => {
      if (type !== "") {
        const filteredPokemons = await getPokemonByType(type);
        setPokemons(filteredPokemons);
        return;
      } else {
        if (allPokemon.length === 0) {
          setPokemons([]);
          setIsLoading(true);
          const detailedPokemon = await fetchAllPokemon();
          setAllPokemon(detailedPokemon);
          setPokemons(detailedPokemon);
          setIsLoading(false);
        } else {
          setPokemons(allPokemon);
        }
      }
    };

    try {
      void filterPokemons();
    } catch (error) {
      console.error(error);
      setError("Error trying to load Pokémon data");
    }
  }, [allPokemon, type]);

  return {
    filters,
    pokemons,
    isLoading,
    error,
  };
};
