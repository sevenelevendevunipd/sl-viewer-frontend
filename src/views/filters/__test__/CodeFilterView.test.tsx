import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { CodeFilterView } from "../CodeFilterView";

import { ICodeFilterViewModel } from "../../../viewmodels/filters/CodeFilterViewModel";

const viewModelFactory = () => ({
  filterableCodes: jest.fn(),
  selectedCodes: jest.fn(),
  onSelectAllClick: jest.fn(),
  onSelectNoneClick: jest.fn(),
  onSelectionChange: jest.fn(),
});

it("Select all test CodeFilterUi", () => {

  const viewModel = viewModelFactory();
  render(CodeFilterView(viewModel as ICodeFilterViewModel));

  const btnElement = screen.getByText(/select all/i);
  btnElement.click();
  expect(viewModel.onSelectAllClick).toBeCalled();
});

it("Select none test CodeFilterUi", () => {

  const viewModel = viewModelFactory();
  render(CodeFilterView(viewModel as ICodeFilterViewModel));

  const btnElement = screen.getByText(/select none/i);
  btnElement.click();
  expect(viewModel.onSelectNoneClick).toBeCalled();
});

it("list all codes of CodeFilteringStrategy test", () => {
  const codes = ["code1", "code2", "code3"];
  const viewModel = viewModelFactory();
  viewModel.filterableCodes.mockReturnValueOnce(codes);

  render(CodeFilterView(viewModel as ICodeFilterViewModel));

  codes.forEach((code) => {
    const codeElement = screen.getByText(code);
    expect(codeElement).toBeInTheDocument();
  });
});
