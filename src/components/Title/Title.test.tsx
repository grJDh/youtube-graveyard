import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("#Title", () => {
  it("renders Title component", async () => {
    render(<Title />, { wrapper: BrowserRouter });
    const headerElement = screen.getByRole("banner");
    const titleElement = screen.getByRole("heading");
    const logoElement = screen.getByRole("img");
    const linkElement = screen.getByRole("link");

    expect(headerElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("alt", "Logo");
    expect(logoElement).toHaveAttribute("src", "/youtube-graveyard/src/assets/grave_main.svg");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
    expect(linkElement).toHaveAttribute("aria-label", "Return to the Start");
  });

  it("matches snapshot", () => {
    render(<Title />, { wrapper: BrowserRouter });
    const headerElement = screen.getByRole("banner");

    expect(headerElement).toMatchSnapshot();
  });

  it("renders different text with text prop given", () => {
    render(<Title text="Test" />, { wrapper: BrowserRouter });
    const titleElement = screen.getByRole("heading");

    expect(titleElement).toHaveTextContent("Test");
  });

  it("renders coffin with coffin prop given", () => {
    render(<Title coffin />, { wrapper: BrowserRouter });
    const logoElement = screen.getByRole("img");

    expect(logoElement).toHaveAttribute("src", "/youtube-graveyard/src/assets/coffin_error.svg");
  });
});
