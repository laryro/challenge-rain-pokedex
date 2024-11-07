import { useContext } from "react";
import { FiltersContext } from ".";

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  return context;
};
