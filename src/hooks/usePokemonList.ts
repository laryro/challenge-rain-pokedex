import { useState, useEffect, useCallback } from "react";
import { Pokemon, PokemonListResponseResult } from "../types/pokemon";
import { getPokemonDetails, getPokemonList } from "../api";

export const intersectPokemons = (
  list1: Pokemon[],
  list2: Pokemon[]
): Pokemon[] => {
  const set2 = new Set(list2.map((pokemon) => pokemon.id));
  return list1.filter((pokemon) => set2.has(pokemon.id));
};

const ROWS_TO_FETCH = 10;
const POKEMONS_PER_ROW = 3;

const groupIntoRows = (
  flatList: Pokemon[],
  pokemonsPerRow: number
): Pokemon[][] => {
  const rows: Pokemon[][] = [];
  for (let i = 0; i < flatList.length; i += pokemonsPerRow) {
    rows.push(flatList.slice(i, i + pokemonsPerRow));
  }
  return rows;
};

interface UsePokemonListProps {
  rows?: number;
  columns?: number;
}

export const usePokemonList = (props?: UsePokemonListProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[][]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pokemonsPerRow = props?.columns || POKEMONS_PER_ROW;
  const rowsToFetch = props?.rows || ROWS_TO_FETCH;
  const limit = pokemonsPerRow * rowsToFetch;

  const loadMorePokemons = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    let fetchedPokemons: Pokemon[] = [];
    try {
      const listResponse = await getPokemonList({ offset, limit });
      const { results, next } = listResponse;

      const detailedPromises = results.map(
        (pokemon: PokemonListResponseResult) => getPokemonDetails(pokemon.url)
      );
      fetchedPokemons = await Promise.all(detailedPromises);

      if (next) {
        setOffset((prevOffset) => prevOffset + limit);
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      const groupedPokemons = groupIntoRows(fetchedPokemons, pokemonsPerRow);
      setPokemons((prevState) => [...prevState, ...groupedPokemons]);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon.");
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, limit, offset, pokemonsPerRow]);

  useEffect(() => {
    setPokemons([]);
    setOffset(0);
    setHasMore(true);
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    pokemons,
    loadMorePokemons,
    hasMore,
    isLoading,
    error,
  };
};
