import { Card } from "primereact/card";
import { Chips } from "primereact/chips";
import { InputNumber } from "primereact/inputnumber";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { EventSequenceFilteringStrategy } from "../../filters/EventSubSequenceFilter";

type ObserverProps = {
  filter: EventSequenceFilteringStrategy;
};

const SequenceObserverUi = observer(({ filter }: ObserverProps) => (
  <>
    <Chips
      value={filter.firstEvent}
      onChange={(e) => (filter.firstEvent = e.value as string[])}
      separator=","
    />
    <Chips
      value={filter.lastEvent}
      onChange={(e) => (filter.lastEvent = e.value as string[])}
      separator=","
    />
    <InputNumber onValueChange={(e) => (filter.time = e.value as number)} />
  </>
));

export const EventSequenceFilterUi = (
  filter: EventSequenceFilteringStrategy
) => {
  const subCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by SubUnit
      <div>
        <Button className="mx-4" label="Select None" onClick={filter.reset} />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="subsequence-filter">
      <Card className="h-full" title={subCardTitle}>
        <SequenceObserverUi filter={filter} />
      </Card>
    </div>
  );
};
