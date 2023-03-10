import React from "react";
import { render, screen } from "@testing-library/react-native";

import App from "./App";

describe("App", () => {
  it("renders successfully", () => {
    render(<App />);
    const headerTitle = screen.getByText("r/pics");
    expect(headerTitle).toBeDefined();
  });
});
