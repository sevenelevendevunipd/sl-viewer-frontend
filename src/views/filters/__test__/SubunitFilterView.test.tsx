import { expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { SubunitFilterView } from "../SubunitFilterView";

import { ConcreteSubunitFilterViewModel } from "../../../viewmodels/filters/SubunitFilterViewModel";
jest.mock("../../../viewmodels/filters/SubunitFilterViewModel");


const viewModelFactory = () => new ConcreteSubunitFilterViewModel({} as any);

it("Select all test Subunit", () => {
  const viewModel = viewModelFactory();

  render(SubunitFilterView(viewModel));

  const btnElement = screen.getByText(/select all/i);
  btnElement.click();
  expect(viewModel.selectAll).toBeCalled();
});

it("Select none test Subunit", () => {
  const viewModel = viewModelFactory();

  render(SubunitFilterView(viewModel));

  const btnElement = screen.getByText(/select none/i);
  btnElement.click();
  expect(viewModel.selectNone).toBeCalled();
});
