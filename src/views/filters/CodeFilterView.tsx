import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { ICodeFilterViewModel } from "../../viewmodels/filters/CodeFilterViewModel";
import { ViewModelProps } from "../../utils";

const CodeFilterObserverView = observer(
  ({ viewModel }: ViewModelProps<ICodeFilterViewModel>) => (
    <ListBox
      options={viewModel.filterableCodes()}
      multiple
      filter
      value={viewModel.selectedCodes()}
      onChange={viewModel.onSelectionChange}
      listStyle={{ height: "300px" }}
    />
  )
);

export const CodeFilterView = (viewModel: ICodeFilterViewModel) => {
  const codeCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Code
      <div>
        <Button
          className="mx-4"
          label="Select All"
          onClick={viewModel.onSelectAllClick}
        />
        <Button
          className="mx-4"
          label="Select None"
          onClick={viewModel.onSelectNoneClick}
        />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="code-filter">
      <Card className="h-full" title={codeCardTitle}>
        <CodeFilterObserverView viewModel={viewModel} />
      </Card>
    </div>
  );
};
