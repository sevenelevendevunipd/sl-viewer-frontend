/* eslint-disable @typescript-eslint/no-explicit-any */

import { SubunitFilteringStrategy } from "../../../filters/SubunitFilter";
import {
  SubunitFilterViewModel,
  ISubunitFilterViewModel,
} from "../SubunitFilterViewModel";

jest.mock("../../../filters/SubunitFilter");

describe("SubunitFilterViewModel", () => {
  let viewModel: ISubunitFilterViewModel;
  let filter: jest.Mocked<SubunitFilteringStrategy>;

  beforeEach(() => {
    filter = new SubunitFilteringStrategy({} as any) as typeof filter;
    viewModel = SubunitFilterViewModel(filter);
  });

  it("suunitTree", () => {
    const subunitTree = Symbol();

    Object.defineProperty(filter, "subunitTree", { value: subunitTree });

    expect(viewModel.subunitTree).toBe(subunitTree);
  });

  it("selectedSubunits", () => {
    const selectedSubunits = Symbol();

    Object.defineProperty(filter, "selectedSubunits", {
      value: selectedSubunits,
    });

    expect(viewModel.selectedSubunits).toBe(selectedSubunits);
  });

  it("setExpandedKeys", () => {
    const expandedKeys = Symbol();

    viewModel.setExpandedKeys(expandedKeys as any);

    expect(viewModel.expandedKeys).toBe(expandedKeys);
  });

  it("onExpandedKeysChange", () => {
    const expandedKeys = Symbol();

    viewModel.onExpandedKeysChange({ value: expandedKeys } as any);

    expect(viewModel.expandedKeys).toBe(expandedKeys);
  });

  it("expandAll", () => {
    const subunitTree = [{ key: "lol" }, { key: "uhm" }, { key: "test" }];

    Object.defineProperty(filter, "subunitTree", { value: subunitTree });

    viewModel.expandAll();

    expect(viewModel.expandedKeys).toEqual({
      lol: true,
      uhm: true,
      test: true,
    });
  });

  it("onSelectionChange", () => {
    const selectionKeys = Symbol();

    viewModel.onSelectionChange({ value: selectionKeys } as any);

    expect(filter.setSelection).toBeCalledWith(selectionKeys);
  });

  it("selectAll", () => {
    viewModel.selectAll();

    expect(filter.selectAll).toBeCalled();
  });

  it("selectNone", () => {
    viewModel.selectNone();

    expect(filter.selectNone).toBeCalled();
  });
});
