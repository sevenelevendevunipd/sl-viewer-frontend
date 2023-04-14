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
      onChange={(e) =>
        options?.editorCallback
          ? options.editorCallback(e.target.value)
          : () => {}
      }
    />
  );
};

const SeqTable = observer(
  ({
    filter,
    firstLast,
  }: {
    filter: EventSequenceFilteringStrategy;
    firstLast: number;
  }) => (
    <>
      <InputText
        type="text"
        placeholder="Code"
        value={filter.getInserting(firstLast).code}
        onChange={(e) => (filter.getInserting(firstLast).code = e.target.value)}
      />
      <InputText
        type="text"
        placeholder="Value"
        value={filter.getInserting(firstLast).value}
        onChange={(e) =>
          (filter.getInserting(firstLast).value = e.target.value)
        }
      />
      <Button type="button" onClick={(e) => filter.addItem(firstLast)}>
        Add
      </Button>

      <DataTable
        value={
          firstLast === filter.FIRST ? filter.firstValues : filter.lastValues
        }
        editMode="row"
        dataKey="id"
        onRowEditComplete={(e) => filter.editItem(e, firstLast)}
        onRowReorder={(e) => filter.reorderItems(e, firstLast)}
        reorderableRows
      >
        <Column rowReorder headerStyle={{ width: "10%" }}></Column>
        <Column
          field="code"
          header="Code"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="value"
          header="Value"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column rowEditor headerStyle={{ width: "10%" }}></Column>
        <Column
          body={(rowData, props) => (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                icon="pi pi-trash"
                severity="danger"
                onClick={(e) => filter.deleteItem(props.rowIndex, firstLast)}
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
      <SeqTable filter={filter} firstLast={filter.LAST} />
      <SeqTable filter={filter} firstLast={filter.FIRST} />
      <InputNumber
        value={filter.time}
        onValueChange={(e) => (filter.time = e.target.value ?? 0)}
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
