import { CalendarChangeEvent } from "primereact/calendar";
import { DateTimeFilteringStrategy } from "../../filters/DateTimeFilter";
import { min, max } from "../../utils";

export type IDateTimeFilterViewModel = ReturnType<typeof DateTimeFilterViewModel>

export const DateTimeFilterViewModel = (filter: DateTimeFilteringStrategy) => ({
    minValue: () => filter.minSelectedTimestamp,
    onMinValueChange: (e: CalendarChangeEvent) => filter.setSelected(e.value as Date, filter.maxSelectedTimestamp),
    minCalendarRangeMin: () => filter.minTimestamp,
    minCalendarRangeMax: () => min(filter.maxTimestamp, filter.maxSelectedTimestamp),

    maxValue: () => filter.maxSelectedTimestamp,
    onMaxValueChange: (e: CalendarChangeEvent) => filter.setSelected(filter.minSelectedTimestamp, e.value as Date),
    maxCalendarRangeMin: () => max(filter.minTimestamp, filter.minSelectedTimestamp),
    maxCalendarRangeMax: () => filter.maxTimestamp
});