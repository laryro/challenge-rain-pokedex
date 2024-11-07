import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import PokemonCard from "../PokemonCard/PokemonCard";
import { usePokemonList } from "../../hooks/usePokemonList";
import { Filters } from "../Filters";
import { useFilterByName } from "../../hooks/useFilterByName";
import { useFiltersContext } from "../../contexts/filters";
import { Pokemon } from "../../types/pokemon";

import styles from "../../styles/Lists.module.css";
import "../../styles/navigation.css";

const ITEMS_PER_PAGE = 12;

interface PokemonsProps {
  pokemons: Pokemon[];
}

function Pokemons({ pokemons }: PokemonsProps) {
  return (
    <>
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.name} />
      ))}
    </>
  );
}

export const PokemonList: React.FC = () => {
  const [itemOffset, setItemOffset] = useState<number>(0);

  const { pokemons, isLoading, error } = usePokemonList();
  const { filters } = useFiltersContext();

  const filteredPokemons = useFilterByName({
    pokemons,
    name: filters.name,
  });

  useEffect(() => {
    setItemOffset(0);
  }, [filters.name, filters.type]);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      const newOffset =
        (event.selected * ITEMS_PER_PAGE) % filteredPokemons.length;
      setItemOffset(newOffset);
    },
    [filteredPokemons.length]
  );

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = filteredPokemons.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);

  const noPokemons = !isLoading && filteredPokemons.length === 0;
  const hasError = !isLoading && error;

  return (
    <div className={styles.container}>
      <Filters />
      <div className={styles.list}>
        {isLoading && <p>Loading Pokédex...</p>}
        <Pokemons pokemons={currentItems} />
      </div>
      <div className="navigation">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
      {noPokemons && (
        <p className={styles.message}>You have no favorite Pokémon yet.</p>
      )}
      {hasError && <p className={styles.error}>{error}</p>}
    </div>
  );
};
