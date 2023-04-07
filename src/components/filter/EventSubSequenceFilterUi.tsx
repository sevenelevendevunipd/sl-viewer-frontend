import { Card } from "primereact/card";
import { Chips } from "primereact/chips";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { EventSubSequenceFilteringStrategy } from "../../filters/EventSubSequenceFilter";

type ObserverProps = {
  filter: EventSubSequenceFilteringStrategy;
};

const SubSequenceObserverUi = observer(({ filter }: ObserverProps) => (
  <Chips
    value={filter.subSequence ?? []}
    onChange={(e) => filter.setSelection(e.value)}
  />
));

export const EventSubSequenceFilterUi = (
  filter: EventSubSequenceFilteringStrategy
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
        <SubSequenceObserverUi filter={filter} />
      </Card>
    </div>
  );
};
