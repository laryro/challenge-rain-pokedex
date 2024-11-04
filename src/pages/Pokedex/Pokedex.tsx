import React from "react";
import { PokemonList } from "../../components/PokemonList";

export const Pokedex: React.FC = () => {
  return (
    <div className="pokedex">
      <PokemonList />
    </div>
  );
};
