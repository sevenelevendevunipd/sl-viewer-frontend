import { ChangeEvent } from "react";
import {
  EventSequenceFilteringStrategy,
  SearchEntry,
} from "../../filters/EventSequenceFilter";
import { runInAction } from "mobx";
import {
  DataTableRowEditCompleteEvent,
  DataTableRowReorderEvent,
} from "primereact/datatable";
import { InputNumberValueChangeEvent } from "primereact/inputnumber";

export type IEventSequenceFilterViewModel = ReturnType<
  typeof EventSequenceFilterViewModel
>;

export const EventSequenceFilterViewModel = (
  filter: EventSequenceFilteringStrategy
) => ({
  getInsertingCode: (isFirst: boolean) => filter.getInserting(isFirst).code,
  getInsertingValue: (isFirst: boolean) => filter.getInserting(isFirst).value,
  setInsertingCode: (isFirst: boolean) => (e: ChangeEvent<HTMLInputElement>) =>
    runInAction(() => (filter.getInserting(isFirst).code = e.target.value)),
  setInsertingValue: (isFirst: boolean) => (e: ChangeEvent<HTMLInputElement>) =>
    runInAction(() => (filter.getInserting(isFirst).value = e.target.value)),
  addItem: (isFirst: boolean) => () => filter.addItem(isFirst),
  values: (isFirst: boolean) =>
    isFirst ? filter.firstValues : filter.lastValues,
  onRowEditComplete: (isFirst: boolean) => (e: DataTableRowEditCompleteEvent) =>
    filter.editItem(e, isFirst),
  onRowReorder:
    (isFirst: boolean) => (e: DataTableRowReorderEvent<SearchEntry[]>) =>
      filter.reorderItems(e, isFirst),
  onDeleteClick: (isFirst: boolean, rowIndex: number) => () =>
    filter.deleteItem(rowIndex, isFirst),
  time: () => filter.time,
  setTime: (e: InputNumberValueChangeEvent) =>
    filter.setTime(e.target.value ?? 0),
  reset: filter.reset,
});
