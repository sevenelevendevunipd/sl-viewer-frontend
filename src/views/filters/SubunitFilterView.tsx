import { Card } from "primereact/card";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ISubunitFilterViewModel } from "../../viewmodels/filters/SubunitFilterViewModel";
import { ViewModelProps } from "../../utils";

const SubunitFilterObserverView = observer(
  ({ viewModel }: ViewModelProps<ISubunitFilterViewModel>) => (
    <Tree
      value={viewModel.subunitTree}
      selectionMode="checkbox"
      selectionKeys={viewModel.selectedSubunits}
      onSelectionChange={viewModel.onSelectionChange}
      expandedKeys={viewModel.expandedKeys}
      onToggle={viewModel.onExpandedKeysChange}
    />
  )
);

export const SubunitFilterView = (viewModel: ISubunitFilterViewModel) => {
  useEffect(viewModel.expandAll);
  const subunitCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by SubUnit
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
    <div className="p-1 col-4" key="subunit-filter">
      <Card className="h-full" title={subunitCardTitle}>
        <SubunitFilterObserverView viewModel={viewModel} />
      </Card>
    </div>
  );
};
