// @vitest-environment jsdom

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateUser from "./CreateUser";

describe("CreateUser", () => {
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn());
  });

  it("submits the user data, creates the user, updates the list, and resets the form", async () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const setUsers = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 3, name: "Cassia", email: "cassia@example.com" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(React.createElement(CreateUser, { users, setUsers }));

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Cassia" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "cassia@example.com" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: /create user/i }).closest("form"),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Cassia", email: "cassia@example.com" }),
      });
    });

    await waitFor(() => {
      expect(setUsers).toHaveBeenCalledWith([
        ...users,
        { id: 3, name: "Cassia", email: "cassia@example.com" },
      ]);
      expect(global.alert).toHaveBeenCalledWith("User created successfully!");
    });
  });
});
