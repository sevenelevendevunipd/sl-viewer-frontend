/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTimeFilteringStrategy } from "../../../filters/DateTimeFilter";
import { DateTimeFilterViewModel, IDateTimeFilterViewModel } from "../DateTimeFilterViewModel";

jest.mock("../../../filters/DateTimeFilter");

describe("DateTimeFilterViewModel", () => {
    let viewModel: IDateTimeFilterViewModel;
    let filter: jest.Mocked<DateTimeFilteringStrategy>;

    beforeEach(() => {
        filter = new DateTimeFilteringStrategy({} as any) as typeof filter;
        viewModel = DateTimeFilterViewModel(filter);
    });

    it("minValue", () => {
        const timestamp = new Date();

        Object.defineProperty(filter, "minSelectedTimestamp", {value: timestamp});

        expect(viewModel.minValue()).toBe(timestamp);
    })

    it("onMinValueChange", () => {
        const minTimestamp = new Date();
        const maxTimestamp = new Date();
        
        Object.defineProperty(filter, "maxSelectedTimestamp", {value: maxTimestamp});

        viewModel.onMinValueChange({value: minTimestamp} as any)
        expect(filter.setSelected).toBeCalledWith(minTimestamp, maxTimestamp);
    })

    it("minCalendarRangeMin", () => {
        const timestamp = new Date();

        Object.defineProperty(filter, "minTimestamp", {value: timestamp});

        expect(viewModel.minCalendarRangeMin()).toBe(timestamp);
    })

    it("minCalendarRangeMax", () => {
        const maxTimestamp = new Date(2023, 4, 15);
        const maxSelectedTimestamp = new Date(2023, 1, 15);

        Object.defineProperty(filter, "maxTimestamp", {value: maxTimestamp});
        Object.defineProperty(filter, "maxSelectedTimestamp", {value: maxSelectedTimestamp});

        expect(viewModel.minCalendarRangeMax()).toBe(maxSelectedTimestamp);
    });

    it("maxValue", () => {
        const timestamp = new Date();

        Object.defineProperty(filter, "maxSelectedTimestamp", {value: timestamp});

        expect(viewModel.maxValue()).toBe(timestamp);
    })

    it("onMaxValueChange", () => {
        const minTimestamp = new Date();
        const maxTimestamp = new Date();
        
        Object.defineProperty(filter, "minSelectedTimestamp", {value: minTimestamp});
        
        viewModel.onMaxValueChange({value: maxTimestamp} as any)
        expect(filter.setSelected).toBeCalledWith(minTimestamp, maxTimestamp);
    })

    it("maxCalendarRangeMin", () => {
        const minTimestamp = new Date(2023, 1, 15);
        const minSelectedTimestamp = new Date(2023, 4, 15);

        Object.defineProperty(filter, "minTimestamp", {value: minTimestamp});
        Object.defineProperty(filter, "minSelectedTimestamp", {value: minSelectedTimestamp});

        expect(viewModel.maxCalendarRangeMin()).toBe(minSelectedTimestamp);
    });

    it("maxCalendarRangeMax", () => {
        const timestamp = new Date();

        Object.defineProperty(filter, "maxTimestamp", {value: timestamp});

        expect(viewModel.maxCalendarRangeMax()).toBe(timestamp);
    })

})