import { ListBoxChangeEvent } from "primereact/listbox";
import { FirmwareFilteringStrategy } from "../../filters/FirmwareFilter";

export type IFirmwareFilterViewModel = ReturnType<typeof FirmwareFilterViewModel>;

export const FirmwareFilterViewModel = (filter: FirmwareFilteringStrategy) => ({
    selectAll: filter.selectAll,
    selectNone: filter.selectNone,
    options: () => filter.filterableFirmwares,
    selection: () => filter.selectedFirmwares,
    onSelectionChange: (e: ListBoxChangeEvent) => filter.setSelection(e.value)
});