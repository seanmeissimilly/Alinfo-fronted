import { describe, test, expect, beforeEach, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";

describe("Landing", () => {
  beforeEach(() => {
    render(<Landing />);
  });
  test("Should show the component", () => {
    expect(
      screen.getByText("Repositorio Virtual de Ingeniería Alimentaria.")
    ).toBeDefined();
  });
  it("Should show the component", () => {
    expect(
      screen.getByText("Repositorio Virtual de Ingeniería Alimentaria.")
    ).toBeDefined();
  });
});
