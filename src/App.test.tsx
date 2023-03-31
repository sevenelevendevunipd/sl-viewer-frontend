import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders upload header text", () => {
  render(<App />);
  const linkElement = screen.getByText(/upload a log file/i);
  expect(linkElement).toBeInTheDocument();
});
