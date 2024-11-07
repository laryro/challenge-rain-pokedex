import React from "react";

import styles from "./Filters.module.css";
import { useFiltersContext } from "../../contexts/filters/useFilters";
import { capitalize } from "../../utils/string";

export const Filters: React.FC = () => {
  const { filters, setFilters, types } = useFiltersContext();

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.currentTarget.value;
    setFilters((prev) => ({ ...prev, type: selectedValue }));
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.currentTarget.value;
    setFilters((prev) => ({ ...prev, name: selectedValue }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name || ""}
          onChange={handleChangeName}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="type">Filter by Type:</label>
        <select
          id="type"
          name="type"
          value={filters.type || ""}
          onChange={handleChangeType}
          className={styles.select}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
