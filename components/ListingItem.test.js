import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import ListingItem from "./ListingItem";
const testItem = {
  data: {
    thumbnail: "",
    name: "test-name",
    thumbnail_height: 140,
    thumbnail_width: 140,
    score: 1234,
    num_comments: 4567,
    permalink: "/r/pics/somthing",
    author: "mikeyv",
    title: "test item",
    all_awardings: [
      { resized_icons: [{ height: 16, width: 16, url: "test-award" }] },
    ],
    created_utc: 1678373954,
  },
};
describe("ListingItem", () => {
  it("Renders successfully with values defined", () => {
    const pressedFn = jest.fn();

    render(<ListingItem item={testItem} onPress={pressedFn} />);

    const listItemThumbnail = screen.getByTestId("list-item-thumbnail");
    const listItemTitle = screen.getByText("test item");
    const listItemAwardIcons = screen.getByTestId(
      "list-item-award-icon-test-award"
    );
    const listItemScore = screen.getByText("1.2k");
    const listItemComments = screen.getByText("4.6k");

    expect(listItemThumbnail).toBeOnTheScreen();
    expect(listItemTitle).toBeOnTheScreen();
    expect(listItemAwardIcons).toBeOnTheScreen();
    expect(listItemScore).toBeOnTheScreen();
    expect(listItemComments).toBeOnTheScreen();
    fireEvent.press(listItemThumbnail);
    expect(pressedFn).toBeCalled();
  });
});
