// @vitest-environment jsdom

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DisplayUserDetails from "./DisplayUserDetails";

describe("DisplayUserDetails", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("loads and displays a single user's details after submitting an ID", async () => {
    const users = [{ id: 1, name: "Cassia", email: "cassia@example.com" }];
    const setUsers = vi.fn();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ id: 1, name: "Cassia", email: "cassia@example.com" }),
      }),
    );

    render(React.createElement(DisplayUserDetails, { users, setUsers }));

    fireEvent.change(screen.getByPlaceholderText(/user id/i), {
      target: { value: "1" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /get user/i }).closest("form"));

    await waitFor(() => {
      expect(screen.getByText(/name: cassia/i)).toBeTruthy();
      expect(screen.getByText(/email: cassia@example.com/i)).toBeTruthy();
    });
  });
});
