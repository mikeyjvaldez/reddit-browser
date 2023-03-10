import React, { useContext } from "react";
import { renderHook } from "@testing-library/react-native";
import useListing from "./use-listing";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

const mockContextValue = {
  filterData: {
    listType: "hot",
    filterBy: "creation",
    filterDirection: "ascending",
    columns: 2,
  },
};

describe("use listing hook", () => {
  beforeEach(() => {
    useContext.mockReturnValue(mockContextValue);
  });

  it("Renders successfully", () => {
    const { result } = renderHook(() => useListing());
    expect(result.current).toBeDefined();
  });
});
