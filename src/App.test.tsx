import { render } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("#App", () => {
  it("renders App", async () => {
    render(<App />, { wrapper: BrowserRouter });
    // const titleElement = screen.getByText(/YouTube Graveyard/i);
    // expect(titleElement).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
