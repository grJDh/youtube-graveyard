import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("#App", () => {
  it("renders App", async () => {
    render(<Title />, { wrapper: BrowserRouter });
    const headerElement = screen.getByRole("banner");
    const titleElement = screen.getByText(/YouTube Graveyard/i);
    const logoElement = screen.getByAltText(/logo/i);
    const linkElement = screen.getByRole("link");

    expect(headerElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
    expect(linkElement).toHaveAttribute("aria-label", "Return to the Start");

    expect(headerElement).toMatchSnapshot();
  });
});
