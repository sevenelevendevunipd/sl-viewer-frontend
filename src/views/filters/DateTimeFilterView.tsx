import { Card } from "primereact/card";
import { observer } from "mobx-react-lite";
import { CalendarChangeEvent } from "primereact/calendar";
import { IDateTimeFilterViewModel } from "../../viewmodels/filters/DateTimeFilterViewModel";
import CalendarHOC from "../../components/CalendarHOC";

const CalendarDoubleHOC = observer(
  ({
    id,
    value,
    onChange,
    minDate,
    maxDate,
  }: {
    id: string;
    value: () => Date;
    onChange: (e: CalendarChangeEvent) => void;
    minDate: () => Date;
    maxDate: () => Date;
  }) => (
    <CalendarHOC
      id={id}
      style={{ width: "100%" }}
      value={value()}
      onChange={onChange}
      minDate={minDate()}
      maxDate={maxDate()}
    />
  )
);

export const DateTimeFilterView = (viewModel: IDateTimeFilterViewModel) => {
  const dateTimeCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Date and Time
    </div>
  );
  return (
    <div className="p-1 col-4" key="datetime-filter">
      <Card className="h-full" title={dateTimeCardTitle}>
        <label htmlFor="calendar-min">Start</label>
        <CalendarDoubleHOC
          id="calendar-min"
          value={viewModel.minValue}
          minDate={viewModel.minCalendarRangeMin}
          maxDate={viewModel.minCalendarRangeMax}
          onChange={viewModel.onMinValueChange}
        />
        <label htmlFor="calendar-max">End</label>
        <CalendarDoubleHOC
          id="calendar-max"
          value={viewModel.maxValue}
          minDate={viewModel.maxCalendarRangeMin}
          maxDate={viewModel.maxCalendarRangeMax}
          onChange={viewModel.onMaxValueChange}
        />
      </Card>
    </div>
  );
};
