import React from "react";
import { PokemonList } from "../../components/PokemonList";
import styles from "./Pokedex.module.css";

export const Pokedex: React.FC = () => {
  return (
    <div className="pokedex">
      <h2 className={styles.title}>Pokedéx</h2>
      <PokemonList />
    </div>
  );
};
