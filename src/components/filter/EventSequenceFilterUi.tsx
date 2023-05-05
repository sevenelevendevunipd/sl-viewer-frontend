import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { EventSequenceFilteringStrategy } from "../../filters/EventSequenceFilter";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column, ColumnEditorOptions } from "primereact/column";

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
    filter,
    isFirst,
  }: {
    filter: EventSequenceFilteringStrategy;
    isFirst: boolean;
  }) => (
    <>
      <InputText
        type="text"
        placeholder="Code"
        value={filter.getInserting(isFirst).code}
        onChange={(e) => (filter.getInserting(isFirst).code = e.target.value)}
      />
      <InputText
        type="text"
        placeholder="Value"
        value={filter.getInserting(isFirst).value}
        onChange={(e) => (filter.getInserting(isFirst).value = e.target.value)}
      />
      <Button type="button" onClick={() => filter.addItem(isFirst)}>
        Add
      </Button>

      <DataTable
        value={isFirst ? filter.firstValues : filter.lastValues}
        editMode="row"
        dataKey="id"
        onRowEditComplete={(e) => filter.editItem(e, isFirst)}
        onRowReorder={(e) => filter.reorderItems(e, isFirst)}
        reorderableRows
      >
        <Column rowReorder headerStyle={{ width: "10%" }}></Column>
        <Column field="code" header="Code" editor={textEditor}></Column>
        <Column field="value" header="Value" editor={textEditor}></Column>
        <Column rowEditor headerStyle={{ width: "10%" }}></Column>
        <Column
          body={(rowData, props) => (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                icon="pi pi-trash"
                severity="danger"
                onClick={() => filter.deleteItem(props.rowIndex, isFirst)}
              ></Button>
            </div>
          )}
          headerClassName="w-10rem"
        />
      </DataTable>
    </>
  )
);

const SeqCard = observer(
  ({ filter }: { filter: EventSequenceFilteringStrategy }) => (
    <>
      <div>First codes</div>
      <SeqTable filter={filter} isFirst={false} />
      <div>Last codes</div>
      <SeqTable filter={filter} isFirst={true} />
      <label htmlFor="maxTimeDelta">Max time delta</label>
      <InputNumber
        id="maxTimeDelta"
        value={filter.time}
        onValueChange={(e) => filter.setTime(e.target.value)}
      />
    </>
  )
);

export const EventSequenceFilterUi = (
  filter: EventSequenceFilteringStrategy
) => {
  const subCardTitle = (
    <div className="flex align-items-center justify-content-between">
      Filter by Event Sequence
      <div>
        <Button className="mx-4" label="Select None" onClick={filter.reset} />
      </div>
    </div>
  );
  return (
    <div className="p-1 col-4" key="subsequence-filter">
      <Card className="h-full" title={subCardTitle}>
        <SeqCard filter={filter} />
      </Card>
    </div>
  );
};
