import axios from "axios";

import {
  Pokemon,
  PokemonListResponse,
  PokemonTypeListResponse,
  TypeDetailResponse,
} from "../../types/pokemon";
import { POKEAPI_BASE_URL } from "../constants";

interface PokemonListType {
  limit?: number;
  offset?: number;
}

export const getPokemonList = async ({
  offset = 0,
  limit = 0,
}: PokemonListType): Promise<PokemonListResponse> => {
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

export const getPokemonListByIds = async (
  ids: number[]
): Promise<Pokemon[]> => {
  const fetchPromises = ids.map((id) => getPokemonDetailsById(id));
  const pokemon = await Promise.all(fetchPromises);
  return pokemon;
};

export const getPokemonTypes = async (): Promise<PokemonTypeListResponse> => {
  const response = await axios.get<PokemonTypeListResponse>(
    `${POKEAPI_BASE_URL}/type`
  );
  return response.data;
};

export const getPokemonByType = async (type: string): Promise<Pokemon[]> => {
  const response = await axios.get<TypeDetailResponse>(
    `${POKEAPI_BASE_URL}/type/${type}`
  );

  const pokemonByType = response.data.pokemon;

  const pokemonPromises = pokemonByType.map((pokemonSlot) =>
    getPokemonDetails(pokemonSlot.pokemon.url)
  );

  const pokemon = await Promise.all(pokemonPromises);
  return pokemon;
};
