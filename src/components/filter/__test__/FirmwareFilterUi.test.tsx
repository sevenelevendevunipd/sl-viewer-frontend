import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { FirmwareFilterUi } from "../FirmwareFilterUi";

import { FirmwareFilteringStrategy } from "../../../filters/FirmwareFilter";
jest.mock("../../../filters/FirmwareFilter");

const logFile = {
  filename: "filename",
  pc_datetime: "",
  ups_datetime: "",
  units_subunits: {},
  log_entries: [],
};

it("Select all test FirmwareFilterUi", () => {
  const filter = new FirmwareFilteringStrategy(logFile);
  render(FirmwareFilterUi(filter));

  const btnElement = screen.getByText(/select all/i);
  btnElement.click();
  expect(filter.selectAll).toBeCalled();
});

it("Select none test firmware FirmwareFilterUi", () => {
  const filter = new FirmwareFilteringStrategy(logFile);
  render(FirmwareFilterUi(filter));

  const btnElement = screen.getByText(/select none/i);
  btnElement.click();
  expect(filter.selectNone).toBeCalled();
});
