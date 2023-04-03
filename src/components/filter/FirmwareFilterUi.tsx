import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { FirmwareFilteringStrategy } from "../../filters/FirmwareFilter";

type ObserverProps = {
  filter: FirmwareFilteringStrategy;
};

const FirmwareFilterObserverUi = observer(({ filter }: ObserverProps) => (
  <ListBox
    options={filter.filterableFirmwares}
    multiple
    filter
    value={filter.selectedFirmwares}
    onChange={(e) => (filter.selectedFirmwares = e.value)}
    listStyle={{ height: "300px" }}
  />
));

export const FirmwareFilterUi = (filter: FirmwareFilteringStrategy) => {
  const firmwareCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Firmware
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
    <div className="p-1 col-4" key="firmware-filter">
      <Card className="h-full" title={firmwareCardTitle}>
        <FirmwareFilterObserverUi filter={filter} />
      </Card>
    </div>
  );
};
