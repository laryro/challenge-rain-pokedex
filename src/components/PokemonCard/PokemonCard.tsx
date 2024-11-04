import React, { useCallback, useEffect, useState } from "react";
import styles from "./PokemonCard.module.css";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];
    setIsFavorite(favorites.includes(pokemon.id));
  }, [pokemon.id]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];

    if (favorites.includes(pokemon.id)) {
      const updated = favorites.filter((id) => id !== pokemon.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(pokemon.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }, [pokemon.id]);

  return (
    <div className={styles.card}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <div className={styles.types}>
          {pokemon.types.map((pokemonType) => (
            <span
              key={pokemonType.type.name}
              className={`${styles.type} ${styles[pokemonType.type.name]}`}
            >
              {pokemonType.type.name}
            </span>
          ))}
        </div>
        <button
          onClick={toggleFavorite}
          className={styles.button}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
