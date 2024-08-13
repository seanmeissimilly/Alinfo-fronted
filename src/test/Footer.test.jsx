import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer Component", () => {
  it("renders Footer component with correct text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("© 2024 Alinfo")).toBeInTheDocument();
    expect(screen.getByText("Ayuda")).toBeInTheDocument();
    expect(screen.getByText("Acerca de")).toBeInTheDocument();
  });

  it("contains links with correct href attributes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Ayuda").closest("a")).toHaveAttribute(
      "href",
      "/help"
    );
    expect(screen.getByText("Acerca de").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("applies correct styles to the footer", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "fixed inset-x-0 bottom-0 w-full bg-gray-400 p-3"
    );
  });
});
