import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import SingleFilterOption from "./SingleFilterOption";

describe("SingleFilterOption", () => {
  it("Renders successfully with values defined", () => {
    const pressedFn = jest.fn();

    render(
      <SingleFilterOption
        text={"option"}
        isSelected={true}
        onPress={pressedFn}
      />
    );

    const filterOptionSelected = screen.getByTestId(
      "single-filter-option-selected"
    );
    const filterOptionText = screen.getByText("option");

    expect(filterOptionSelected).toBeOnTheScreen();
    expect(filterOptionText).toBeOnTheScreen();
    fireEvent.press(filterOptionText);
    expect(pressedFn).toBeCalled();
  });
});
