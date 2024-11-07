import React, { useState, useEffect, ReactNode } from "react";
import { FiltersContext, FiltersType, FiltersContextType } from "./";
import { getPokemonTypes } from "../../api/pokemon";

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FiltersType>({
    name: "",
    type: "",
  });
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const typesData = await getPokemonTypes();
        setTypes(typesData.results.map((type) => type.name).sort());
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch filter data.");
        setIsLoading(false);
      }
    };

    void fetchFilters();
  }, []);

  const contextValue: FiltersContextType = {
    filters,
    setFilters,
    types,
    isLoading,
    error,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};
