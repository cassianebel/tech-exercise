// @vitest-environment jsdom

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeleteUser from "./DeleteUser";

describe("DeleteUser", () => {
  beforeEach(() => {
    vi.stubGlobal("alert", vi.fn());
  });

  it("submits the user ID, deletes the user, updates the list, and resets the form", async () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const setUsers = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });

    vi.stubGlobal("fetch", fetchMock);

    render(React.createElement(DeleteUser, { users, setUsers }));

    fireEvent.change(screen.getByPlaceholderText(/enter user id/i), {
      target: { value: "1" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /delete user/i }).closest("form"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/users/1", {
        method: "DELETE",
      });
    });

    await waitFor(() => {
      expect(setUsers).toHaveBeenCalledWith([{ id: 2, name: "Bob" }]);
      expect(global.alert).toHaveBeenCalledWith("User with ID 1 has been deleted.");
    });
  });
});
