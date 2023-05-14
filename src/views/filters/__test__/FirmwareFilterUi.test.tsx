import { expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { FirmwareFilterView } from "../FirmwareFilterView";

import { IFirmwareFilterViewModel } from "../../../viewmodels/filters/FirmwareFilterViewModel";

const viewModelFactory = () => ({
  selectAll: jest.fn(),
  selectNone: jest.fn(),
  selection: jest.fn(),
  onSelectionChange: jest.fn(),
  options: [],
})

it("Select all test FirmwareFilterView", () => {
  const viewModel = viewModelFactory();
  
  render(FirmwareFilterView(viewModel as IFirmwareFilterViewModel));

  const btnElement = screen.getByText(/select all/i);
  btnElement.click();
  expect(viewModel.selectAll).toBeCalled();
});

it("Select none test firmware FirmwareFilterView", () => {
  const viewModel = viewModelFactory();
  render(FirmwareFilterView(viewModel as IFirmwareFilterViewModel));

  const btnElement = screen.getByText(/select none/i);
  btnElement.click();
  expect(viewModel.selectNone).toBeCalled();
});
