import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { IFirmwareFilterViewModel } from "../../viewmodels/filters/FirmwareFilterViewModel";
import { ViewModelProps } from "../../utils";

const FirmwareFilterObserverView = observer(({ viewModel }: ViewModelProps<IFirmwareFilterViewModel>) => (
  <ListBox
    options={viewModel.options}
    multiple
    filter
    value={viewModel.selection()}
    onChange={viewModel.onSelectionChange}
    listStyle={{ height: "300px" }}
  />
));

export const FirmwareFilterView = (viewModel: IFirmwareFilterViewModel) => {
  const firmwareCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Firmware
      <div>
        <Button
          className="mx-4"
          label="Select All"
          onClick={viewModel.selectAll}
        />
        <Button
          className="mx-4"
          label="Select None"
          onClick={viewModel.selectNone}
        />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="firmware-filter">
      <Card className="h-full" title={firmwareCardTitle}>
        <FirmwareFilterObserverView viewModel={viewModel} />
      </Card>
    </div>
  );
};
