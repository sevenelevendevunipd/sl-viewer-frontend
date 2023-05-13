import { ListBoxChangeEvent } from "primereact/listbox";
import { CodeFilteringStrategy } from "../../filters/CodeFilter";

export type ICodeFilterViewModel = ReturnType<typeof CodeFilterViewModel>;

export const CodeFilterViewModel = (filter: CodeFilteringStrategy) => ({
  filterableCodes: () => filter.filterableCodes,
  selectedCodes: () => filter.selectedCodes,
  onSelectAllClick: filter.selectAll,
  onSelectNoneClick: filter.selectNone,
  onSelectionChange: (e: ListBoxChangeEvent) => filter.setSelection(e.value),
});
