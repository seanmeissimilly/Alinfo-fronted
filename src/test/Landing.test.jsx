import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";

describe("Landing", () => {
  test("Should show the component", () => {
    render(<Landing />);
    expect(
      screen.getByText("Repositorio Virtual de Ingeniería Alimentaria.")
    ).toBeDefined();
  });
});
