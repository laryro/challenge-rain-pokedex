import { useCallback, useState } from "react";
import { Pokemon, PokemonListResponseResult } from "../types/pokemon";
import { getPokemonDetails, getPokemonList } from "../api";

export const useFetchPokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[][]>([]); // Array of rows
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);

  const POKEMONS_PER_ROW = 3;
  const limit = POKEMONS_PER_ROW * 20;

  const groupIntoRows = (flatList: Pokemon[]): Pokemon[][] => {
    const rows: Pokemon[][] = [];
    for (let i = 0; i < flatList.length; i += POKEMONS_PER_ROW) {
      rows.push(flatList.slice(i, i + POKEMONS_PER_ROW));
    }
    return rows;
  };

  const loadNextPage = useCallback(async () => {
    if (isNextPageLoading || !hasNextPage) return;

    setIsNextPageLoading(true);
    setError(null);

    try {
      const listResponse = await getPokemonList({ offset, limit });
      const { results, next } = listResponse;

      const detailedPromises = results.map(
        (pokemon: PokemonListResponseResult) => getPokemonDetails(pokemon.url)
      );
      const detailedPokemon = await Promise.all(detailedPromises);

      const rows = groupIntoRows(detailedPokemon);

      setPokemonList((prev) => [...prev, ...rows]);

      if (next) {
        setOffset((prevOffset) => prevOffset + limit);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
      setError("Failed to load Pokémon.");
    } finally {
      setIsNextPageLoading(false);
    }
  }, [isNextPageLoading, hasNextPage, offset, limit]);

  return {
    pokemonList,
    hasNextPage,
    isNextPageLoading,
    loadNextPage,
    error,
  };
};
