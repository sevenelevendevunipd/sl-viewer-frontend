import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {observer} from "mobx-react-lite";
import {Calendar} from "primereact/calendar";
import {DateTimeFilteringStrategy} from "../../filters/DateTimeFilter";

type ObserverProps = {
  filter: DateTimeFilteringStrategy;
};

const DateTimeFilterObserverUi = observer(({filter}: ObserverProps) => (
  <Calendar
    //TODO: si aggiorna subito impedendo selezione multipla (range):
    value={[new Date(filter.selectedDateTimes[0]),
      new Date(filter.selectedDateTimes[filter.selectedDateTimes.length - 1])]}
    onChange={(e) => {
      const date = e.value as Date[];
      filter.selectNone();
      //TODO: 90% sbagliato, trovare modo migliore
      date.forEach((e) => filter.selectedDateTimes.push(e.toISOString()));
    }}
    minDate={new Date(filter.filterableDateTimes[0])}
    maxDate={new Date(filter.filterableDateTimes[filter.filterableDateTimes.length - 1])}
    showIcon
    selectionMode="range"
    /*TODO: fix time and add these options
    showTime
    showSeconds
    showMillisec
    hourFormat="24"
    */
    //readOnlyInput
  />
));

export const DateTimeFilterUi = (filter: DateTimeFilteringStrategy) => {
  const dateTimeCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Date and Time
      <div>
        <Button
          className="mx-4"
          label="Select All"
          onClick={filter.selectAll}
        />
        <Button
          className="mx-4"
          label="Select None"
          onClick={filter.selectNone}
        />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="datetime-filter">
      <Card className="h-full" title={dateTimeCardTitle}>
        <DateTimeFilterObserverUi filter={filter}/>
      </Card>
    </div>
  );
};
