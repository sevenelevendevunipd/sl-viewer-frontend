/* eslint-disable @typescript-eslint/no-explicit-any */

import { FirmwareFilteringStrategy } from "../../../filters/FirmwareFilter";
import { FirmwareFilterViewModel, IFirmwareFilterViewModel } from "../FirmwareFilterViewModel";

jest.mock("../../../filters/FirmwareFilter");

describe("FirmwareFilterViewModel", () => {
    let viewModel: IFirmwareFilterViewModel;
    let filter: jest.Mocked<FirmwareFilteringStrategy>;

    beforeEach(() => {
        filter = new FirmwareFilteringStrategy({} as any) as typeof filter;
        viewModel = FirmwareFilterViewModel(filter);
    })

    it("selectAll", () => {
        viewModel.selectAll();

        expect(filter.selectAll).toBeCalled();
    })

    it("selectNone", () => {
        viewModel.selectNone();

        expect(filter.selectNone).toBeCalled();
    })

    it("options", () => {
        const firmwares = ["a", "b", "c"];

        Object.defineProperty(filter, "filterableFirmwares", {value: firmwares});

        expect(viewModel.options()).toBe(firmwares);
    })

    it("selection", () => {
        const firmwares = ["a", "b", "c"];

        Object.defineProperty(filter, "selectedFirmwares", {value: firmwares});

        expect(viewModel.selection()).toBe(firmwares);
    })

    it("onSelectionChange", () => {
        const firmwares = ["a", "b", "c"];

        viewModel.onSelectionChange({value: firmwares} as any);

        expect(filter.setSelection).toBeCalledWith(firmwares);
    })
})