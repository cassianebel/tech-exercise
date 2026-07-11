// @vitest-environment jsdom

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const signOutMock = vi.hoisted(() => vi.fn());

vi.mock("../lib/auth-client", () => ({
  authClient: {
    signOut: signOutMock,
  },
}));

import SignOut from "./SignOut";

describe("SignOut", () => {
  beforeEach(() => {
    signOutMock.mockReset();
    vi.stubGlobal("alert", vi.fn());
  });

  it("calls authClient.signOut and shows an alert when clicked", async () => {
    signOutMock.mockResolvedValue({ error: null });

    render(React.createElement(SignOut));

    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));

    expect(signOutMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Signed out!");
    });
  });
});
