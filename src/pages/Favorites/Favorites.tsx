import React, { useCallback, useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import styles from "../../styles/Lists.module.css";
import { Pokemon } from "../../types/pokemon";
import { getPokemonListByIds } from "../../api/pokemon";

export const FavoritesPage: React.FC = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favoriteIds = JSON.parse(storedFavorites || "") as number[];
    const sortedFavorites = favoriteIds.sort((a, b) => a - b);

    const fetchFavoritePokemons = async () => {
      try {
        setIsLoading(true);
        const pokemonList = await getPokemonListByIds(sortedFavorites);
        setFavoritePokemons(pokemonList);
      } catch {
        setError("Error trying to load Favorite Pokémon data");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchFavoritePokemons();
  }, []);

  const onRemoveFavorite = useCallback(
    (id: number) => {
      const newFavoritePokemons = favoritePokemons.filter(
        (pokemon) => pokemon.id != id
      );
      setFavoritePokemons([...newFavoritePokemons]);
    },
    [favoritePokemons]
  );

  const hasPokemons = !isLoading && favoritePokemons.length > 0;
  const noPokemons = !isLoading && favoritePokemons.length === 0;
  const hasError = !isLoading && error;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Favorite Pokémon</h2>
      {isLoading && <p>Loading favorite Pokémon...</p>}
      {hasPokemons && (
        <div className={styles.list}>
          {favoritePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemoveFavorite={() => {
                onRemoveFavorite(pokemon.id);
              }}
            />
          ))}
        </div>
      )}
      {noPokemons && (
        <p className={styles.message}>You have no favorite Pokémon yet.</p>
      )}
      {hasError && <p className={styles.error}>{error}</p>}
    </div>
  );
};
