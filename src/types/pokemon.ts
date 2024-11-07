export interface PokemonListResponseResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResponseResult[];
}

export interface PokemonTypeListResponse {
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}
export interface TypeDetailResponse {
  id: number;
  name: string;
  pokemon: Array<{
    slot: number;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}
