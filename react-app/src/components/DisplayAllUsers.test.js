// @vitest-environment jsdom

import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DisplayAllUsers from "./DisplayAllUsers";

describe("DisplayAllUsers", () => {
  it("renders the heading and a list of user names", () => {
    const users = [
      { id: 8, name: "Cassia" },
      { id: 7, name: "Bob" },
    ];

    render(React.createElement(DisplayAllUsers, { users }));

    expect(
      screen.getByRole("heading", { name: /display all users/i }),
    ).toBeTruthy();
    expect(screen.getByText("Cassia")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
  });
});
