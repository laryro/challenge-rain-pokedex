// src/components/PokemonList.tsx

import React, { useCallback } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

import { useFetchPokemon } from "../../hooks/useFetchPokemon";
import { Pokemon } from "../../types/pokemon";

import styles from "./PokemonList.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import useAvailableHeight from "../../hooks/useAvailableHeight";

const ROW_HEIGHT = 170;
const LIST_WIDTH = "100%";

export const PokemonList: React.FC = () => {
  const { pokemonList, hasNextPage, isNextPageLoading, loadNextPage, error } =
    useFetchPokemon();
  const { parentElementRef, height } = useAvailableHeight();

  const itemCount = hasNextPage ? pokemonList.length + 1 : pokemonList.length;

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < pokemonList.length,
    [hasNextPage, pokemonList]
  );

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

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

  return (
    <div className={styles.container} ref={parentElementRef}>
      {error && <div className={styles.error}>{error}</div>}
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
      {isNextPageLoading && (
        <div className={styles.loading}>Loading more Pokémon...</div>
      )}
    </div>
  );
};
