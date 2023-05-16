/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CodeFilterViewModel,
  ICodeFilterViewModel,
} from "../CodeFilterViewModel";
import { CodeFilteringStrategy } from "../../../filters/CodeFilter";
import { ListBoxChangeEvent } from "primereact/listbox";

jest.mock("../../../filters/CodeFilter");

describe("CodeFilterViewModel", () => {
  let viewModel: ICodeFilterViewModel;
  let filter: jest.Mocked<CodeFilteringStrategy>;

  beforeEach(() => {
    filter = new CodeFilteringStrategy({} as any) as typeof filter;
    viewModel = CodeFilterViewModel(filter);
  });

  it("filterableCodes", () => {
    const filterableCodes = ["code1", "code2"];
    Object.defineProperty(filter, "filterableCodes", {
      value: filterableCodes,
    });
    expect(viewModel.filterableCodes()).toBe(filterableCodes);
  });

  it("selectedCodes", () => {
    filter.selectedCodes = ["code1"];
    expect(viewModel.selectedCodes()).toBe(filter.selectedCodes);
  });

  it("onSelectAllClick", () => {
    viewModel.onSelectAllClick();
    expect(filter.selectAll).toBeCalled();
  });

  it("onSelectNoneClick", () => {
    viewModel.onSelectNoneClick();
    expect(filter.selectNone).toBeCalled();
  });

  it("onSelectionChange", () => {
    const selection = ["code1"];
    const event = { value: selection } as ListBoxChangeEvent;
    viewModel.onSelectionChange(event);
    expect(filter.setSelection).toBeCalledWith(selection);
  });
});
