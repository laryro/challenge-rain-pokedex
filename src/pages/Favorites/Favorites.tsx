// src/pages/Favorites/Favorites.tsx
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import styles from "./Favorites.module.css";
import { getPokemonDetailsById } from "../../api";
import { Pokemon } from "../../types/pokemon";

export const FavoritesPage: React.FC = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFavoritePokemons = async (ids: number[]) => {
    setIsLoading(true);
    setError("");
    try {
      const fetchPromises = ids.map((id) => getPokemonDetailsById(id));
      const pokemons = await Promise.all(fetchPromises);
      setFavoritePokemons(pokemons);
    } catch (err) {
      console.error(err);
      setError("Failed to load favorite Pokémon.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites) as number[];
      const sortedIds = favoriteIds.sort((a, b) => a - b);
      void fetchFavoritePokemons(sortedIds);
    }
  }, []);

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
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
