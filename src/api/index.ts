import axios from "axios";

import { Pokemon, PokemonListResponse } from "../types/pokemon";
import { POKEAPI_BASE_URL } from "./constants";

export interface PokemonListRequest {
  limit?: number;
  offset?: number;
}

export const getPokemonList = async ({
  offset = 0,
  limit = 0,
}: PokemonListRequest): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(
    `${POKEAPI_BASE_URL}/pokemon`,
    {
      params: { offset, limit },
    }
  );
  return response.data;
};

export const getPokemonDetails = async (url: string): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(url);
  return response.data;
};

export const getPokemonDetailsById = async (id: number): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(
    `${POKEAPI_BASE_URL}/pokemon/${id.toString()}/`
  );
  return response.data;
};

