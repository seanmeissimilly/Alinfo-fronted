import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import "@material-tailwind/react/tailwind.css";

configure({ testIdAttribute: "data-testid" });
