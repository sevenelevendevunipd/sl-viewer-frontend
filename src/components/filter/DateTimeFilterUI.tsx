import { Card } from "primereact/card";
import { observer } from "mobx-react-lite";
import { Calendar } from "primereact/calendar";
import { DateTimeFilteringStrategy } from "../../filters/DateTimeFilter";
import { min, max } from "../../utils";

type ObserverProps = {
  filter: DateTimeFilteringStrategy;
};

const DateTimeFilterObserverUi = observer(({ filter }: ObserverProps) => (
  <>
    <label htmlFor="inferiore">Estremo temporale inferiore</label>
    <Calendar
      id="inferiore"
      style={{ width: "100%" }}
      value={filter.minSelectedTimestamp}
      onChange={(e) =>
        filter.setSelected(e.value as Date, filter.maxSelectedTimestamp)
      }
      minDate={filter.minTimestamp}
      maxDate={min(filter.maxTimestamp, filter.maxSelectedTimestamp)}
      showIcon
      showTime
      showSeconds
      showMillisec
      hourFormat="24"
      readOnlyInput
    />
    <label htmlFor="superiore">Estremo temporale superiore</label>
    <Calendar
      id="superiore"
      style={{ width: "100%" }}
      value={filter.maxSelectedTimestamp}
      onChange={(e) =>
        filter.setSelected(filter.minSelectedTimestamp, e.value as Date)
      }
      minDate={max(filter.minTimestamp, filter.minSelectedTimestamp)}
      maxDate={filter.maxTimestamp}
      showIcon
      showTime
      showSeconds
      showMillisec
      hourFormat="24"
      readOnlyInput
    />
  </>
));

export const DateTimeFilterUi = (filter: DateTimeFilteringStrategy) => {
  const dateTimeCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Date and Time
    </div>
  );
  return (
    <div className="p-1 col-4" key="datetime-filter">
      <Card className="h-full" title={dateTimeCardTitle}>
        <DateTimeFilterObserverUi filter={filter} />
      </Card>
    </div>
  );
};
