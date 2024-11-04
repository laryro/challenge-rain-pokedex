// src/components/PokemonList.tsx

import React, { useCallback } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

import { Pokemon } from "../../types/pokemon";

import styles from "./PokemonList.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import useAvailableHeight from "../../hooks/useAvailableHeight";
import { Filters } from "../Filters";
import { usePokemonList } from "../../hooks/usePokemonList";

const ROW_HEIGHT = 170;
const LIST_WIDTH = "100%";

export const PokemonList: React.FC = () => {
  const {
    pokemons: pokemonList,
    loadMorePokemons,
    hasMore,
    isLoading,
    error,
  } = usePokemonList();
  const { parentElementRef, height } = useAvailableHeight();

  const isItemLoaded = useCallback(
    (index: number) => !hasMore || index < pokemonList.length,
    [hasMore, pokemonList]
  );

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      if (!isItemLoaded(index)) {
        return (
          <div style={style} className={styles.rowLoading}>
            Loading...
          </div>
        );
      }

      const pokemons: Pokemon[] = pokemonList[index];

      return (
        <div style={style} className={styles.row}>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      );
    },
    [isItemLoaded, pokemonList]
  );

  const itemCount = hasMore ? pokemonList.length + 1 : pokemonList.length;
  const loadMoreItems = isLoading ? () => {} : loadMorePokemons;

  return (
    <div>
      <Filters />
      <div className={styles.container} ref={parentElementRef}>
        {error && <p className={styles.error}>{error}</p>}
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          threshold={10}
        >
          {(props) => (
            <List
              height={height}
              itemCount={itemCount}
              itemSize={ROW_HEIGHT}
              width={LIST_WIDTH}
              {...props}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
        {isLoading && <p className={styles.loading}>Loading Pokémons...</p>}
      </div>
    </div>
  );
};
