import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  ILogFilteringService,
  useLogFilteringService,
} from "../../services/LogFilteringService";

type ObserverProps = {
  filteringService: ILogFilteringService;
};

const LogTableObserver = observer(({ filteringService }: ObserverProps) => (
  <>
    <DataTable
      value={filteringService.filteredEntries}
      removableSort
      sortField="timestamp"
      size="large"
      header={`Showing ${filteringService.filteredEntries.length} log entries`}
      showGridlines
      responsiveLayout="scroll"
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rows={10}
    >
      <Column
        key="timestamp"
        field="timestamp"
        header="Timestamp"
        style={{ width: "15%" }}
        sortable
      />
      <Column
        key="unit"
        field="unit"
        header="Unit"
        style={{ width: "7%" }}
        sortable
      />
      <Column
        key="subunit"
        field="subunit"
        header="SubUnit"
        style={{ width: "7%" }}
        sortable
      />
      <Column
        key="ini_filename"
        field="ini_filename"
        header="Device"
        style={{ width: "18%" }}
        sortable
      />
      <Column
        key="code"
        field="code"
        header="Code"
        style={{ width: "15%" }}
        sortable
      />
      <Column
        key="description"
        field="description"
        header="Description"
        style={{ width: "15%" }}
        sortable
      />
      <Column
        key="value"
        field="value"
        header="Value"
        style={{ width: "23%" }}
        sortable
      />
    </DataTable>
  </>
));

export const LogTable = () => {
  const filteringService = useLogFilteringService();
  return <LogTableObserver filteringService={filteringService} />;
};
