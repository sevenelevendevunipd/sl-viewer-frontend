import { describe, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { EventSequenceFilterView } from "../EventSequenceFilterView";
import { IEventSequenceFilterViewModel } from "../../../viewmodels/filters/EventSequenceFilterViewModel";

describe("EventSequenceFilterView", () => {
  let viewModel: jest.Mocked<IEventSequenceFilterViewModel>;

  beforeEach(() => {
    viewModel = {
      getInsertingCode: jest.fn(),
      getInsertingValue: jest.fn(),
      setInsertingCode: jest.fn(),
      setInsertingValue: jest.fn(),
      addItem: jest.fn(),
      values: jest.fn(),
      onRowEditComplete: jest.fn(),
      onRowReorder: jest.fn(),
      onDeleteClick: jest.fn(),
      time: jest.fn(),
      setTime: jest.fn(),
      reset: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    render(EventSequenceFilterView(viewModel));
  });

  it("Add calls addItem", () => {
    const buttons = screen.getAllByText(/Add/i);
    for (const b of buttons) {
      b.click();
    }
    expect(viewModel.addItem).toBeCalledTimes(buttons.length);
  });

  it("Take input on code EventSequenceFilterView", () => {
    const codeInputs = screen.getAllByPlaceholderText("Code");
    const codeValues = screen.getAllByPlaceholderText("Value");
    const buttons = screen.getAllByText(/Add/i);

    expect(codeInputs.length).toBe(buttons.length);
    expect(codeValues.length).toBe(buttons.length);

    for (const i of codeInputs) user.type(i, "C");
    for (const i of codeValues) user.type(i, "V");
    for (const b of buttons) b.click();
    expect(viewModel.addItem).toBeCalledTimes(buttons.length);

    expect(viewModel.getInsertingCode).toBeCalledTimes(buttons.length);
    expect(viewModel.getInsertingValue).toBeCalledTimes(buttons.length);
  });
});
