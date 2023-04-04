import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { DateTimeFilteringStrategy } from "../../filters/DateTimeFilter";

type ObserverProps = {
  filter: DateTimeFilteringStrategy;
};

const DateTimeFilterObserverUi = observer(({ filter }: ObserverProps) => (
  <ListBox
    options={filter.filterableDateTimes}
    multiple
    filter
    value={filter.selectedDateTimes}
    onChange={(e) => (filter.selectedDateTimes = e.value)}
    listStyle={{ height: "300px" }}
  />
));

export const DateTimeFilterUi = (filter: DateTimeFilteringStrategy) => {
  const DateTimeCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by DateTime
      <div>
        <Button
          className="mx-4"
          label="Select All"
          onClick={filter.selectAll}
        />
        <Button
          className="mx-4"
          label={filter.filterableDateTimes[0]}
          onClick={filter.selectNone}
        />
        <input
          type="date"
          className="mx-4"
          value={filter.filterableDateTimes[0]}
        />
        <input type="date" className="mx-4" />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="firmware-filter">
      <Card className="h-full" title={DateTimeCardTitle}>
        <DateTimeFilterObserverUi filter={filter} />
      </Card>
    </div>
  );
};
