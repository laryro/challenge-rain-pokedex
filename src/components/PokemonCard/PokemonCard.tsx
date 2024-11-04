import React from "react";
import styles from "./PokemonCard.module.css";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
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
            <span key={pokemonType.type.name} className={styles.type}>
              {pokemonType.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
