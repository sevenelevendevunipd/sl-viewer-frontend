import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column, ColumnEditorOptions } from "primereact/column";
import { IEventSequenceFilterViewModel } from "../../viewmodels/filters/EventSequenceFilterViewModel";
import { ViewModelProps } from "../../utils";

const textEditor = (options: ColumnEditorOptions) => {
  return (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options?.editorCallback?.(e.target.value)}
    />
  );
};

const SeqTable = observer(
  ({
    viewModel,
    isFirst,
  }: {
    isFirst: boolean;
  } & ViewModelProps<IEventSequenceFilterViewModel>) => (
    <>
      <InputText
        type="text"
        placeholder="Code"
        value={viewModel.getInsertingCode(isFirst)}
        onChange={viewModel.setInsertingCode(isFirst)}
      />
      <InputText
        type="text"
        placeholder="Value"
        value={viewModel.getInsertingValue(isFirst)}
        onChange={viewModel.setInsertingValue(isFirst)}
      />
      <Button type="button" onClick={viewModel.addItem(isFirst)} label="Add"/>

      <DataTable
        value={viewModel.values(isFirst)}
        editMode="row"
        dataKey="id"
        onRowEditComplete={viewModel.onRowEditComplete(isFirst)}
        onRowReorder={viewModel.onRowReorder(isFirst)}
        reorderableRows
      >
        <Column rowReorder headerStyle={{ width: "10%" }}></Column>
        <Column field="code" header="Code" editor={textEditor}></Column>
        <Column field="value" header="Value" editor={textEditor}></Column>
        <Column rowEditor headerStyle={{ width: "10%" }}></Column>
        <Column
          body={(_, {rowIndex}) => (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                icon="pi pi-trash"
                severity="danger"
                onClick={viewModel.onDeleteClick(isFirst, rowIndex)}
              />
            </div>
          )}
          headerClassName="w-10rem"
        />
      </DataTable>
    </>
  )
);

const SeqCard = observer(
  ({ viewModel }: ViewModelProps<IEventSequenceFilterViewModel>) => (
    <>
      <div>First codes</div>
      <SeqTable viewModel={viewModel} isFirst={false} />
      <div>Last codes</div>
      <SeqTable viewModel={viewModel} isFirst={true} />
      <label htmlFor="maxTimeDelta">Max time delta</label>
      <InputNumber
        id="maxTimeDelta"
        value={viewModel.time()}
        onValueChange={viewModel.setTime}
      />
    </>
  )
);

export const EventSequenceFilterView = (
  viewModel: IEventSequenceFilterViewModel
) => {
  const subCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Event Sequence
      <div>
        <Button className="mx-4" label="Reset" onClick={viewModel.reset} />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-5" key="subsequence-filter">
      <Card className="h-full" title={subCardTitle}>
        <SeqCard viewModel={viewModel} />
      </Card>
    </div>
  );
};
