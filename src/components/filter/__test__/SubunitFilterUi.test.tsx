import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { SubunitFilterUi } from "../SubunitFilterUi";

import { SubunitFilteringStrategy } from "../../../filters/SubunitFilter";
jest.mock("../../../filters/SubunitFilter");

const logFile = {
  filename: "filename",
  pc_datetime: "",
  ups_datetime: "",
  units_subunits: {},
  log_entries: [],
};

it("Select all test Subunit", () => {
  const filter = new SubunitFilteringStrategy(logFile);
  Object.defineProperty(filter, "subunitTree", { value: [] });

  render(SubunitFilterUi(filter));

  const btnElement = screen.getByText(/select all/i);
  btnElement.click();
  expect(filter.selectAll).toBeCalled();
});

it("Select none test Subunit", () => {
  const filter = new SubunitFilteringStrategy(logFile);
  Object.defineProperty(filter, "subunitTree", { value: [] });

  render(SubunitFilterUi(filter));

  const btnElement = screen.getByText(/select none/i);
  btnElement.click();
  expect(filter.selectNone).toBeCalled();
});
