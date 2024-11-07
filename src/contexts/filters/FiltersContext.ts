import React, { createContext } from "react";

export interface FiltersType {
  name: string;
  type: string;
}

export interface FiltersContextType {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  types: string[];
  isLoading: boolean;
  error: string;
}

export const FiltersContext = createContext({} as FiltersContextType);
