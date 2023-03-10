import { createContext } from "react";
import { useImmer } from "use-immer";

export const FilterContext = createContext(null);

export default function FilterContextProvider({ children }) {
  const [filterData, setFilterData] = useImmer({
    listType: "hot",
    filterBy: "creation",
    filterDirection: "ascending",
    columns: 2,
  });

  return (
    <FilterContext.Provider
      value={{ filterData, updateFilterData: setFilterData }}
    >
      {children}
    </FilterContext.Provider>
  );
}
