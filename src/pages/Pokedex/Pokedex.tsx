import React from "react";
import { PokemonList } from "../../components/PokemonList";
import "./Pokedex.css";

export const Pokedex: React.FC = () => {
  return (
    <div className="pokedex">
      <PokemonList />
    </div>
  );
};
