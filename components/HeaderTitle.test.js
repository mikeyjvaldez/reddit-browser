import React from "react";
import { render, screen } from "@testing-library/react-native";

import HeaderTitle from "./HeaderTitle";

describe("Header Title", () => {
  it("Renders successfully with values defined", () => {
    render(<HeaderTitle title={"Testing Title"} subtitle={"Subtitle"} />);
    const headerTitle = screen.getByText("Testing Title");
    const headerSubtitle = screen.getByText("Subtitle");
    expect(headerTitle).toBeOnTheScreen();
    expect(headerSubtitle).toBeOnTheScreen();
  });
  it("Renders successfully with subtitle not defined", () => {
    render(<HeaderTitle title={"Testing Title"} />);
    const headerTitle = screen.getByText("Testing Title");
    const headerSubtitle = screen.queryByTestId("header-subtitle");
    expect(headerTitle).toBeOnTheScreen();
    expect(headerSubtitle).not.toBeOnTheScreen();
  });
});
