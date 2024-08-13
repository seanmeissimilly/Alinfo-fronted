import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";

describe("Tool", () => {
  test("add two numbers", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("Landing", () => {
  test("find Landing", () => {
    render(<Landing />);
    expect(
      screen.getByText("Repositorio Virtual de Ingeniería Alimentaria.")
    ).toBeDefined();
  });
});

// describe("Messages", () => {
//   test("find Messages", () => {
//     render(<Messages>casa bonita</Messages>);
//     expect(screen.getByText("casa bonita")).toBeDefined();
//   });
// });

// describe("Tool", () => {
//   test("find Tool", () => {
//     render(
//       <Tool
//         id={25}
//         title={"Tool Test"}
//         description={"app.description"}
//         classification={"2"}
//         user={"Tigri"}
//         email={"seanmeissimilly@yahoo.com"}
//         userInfo={{ email: "seanmeissimilly@yahoo.com" }}
//         userImage={""}
//         userRole={"reader"}
//         data={""}
//         date={"01/01/2024"}
//         onDelete={() => {}}
//       ></Tool>
//     );
//     expect(screen.getByText("Tool Test")).toBeDefined();
//   });
// });
