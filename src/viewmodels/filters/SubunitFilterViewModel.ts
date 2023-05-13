import {
  TreeCheckboxSelectionKeys,
  TreeExpandedEvent,
  TreeExpandedKeysType,
  TreeSelectionEvent,
} from "primereact/tree";
import { SubunitFilteringStrategy } from "../../filters/SubunitFilter";
import { action, makeObservable, observable } from "mobx";
import TreeNode from "primereact/treenode";

export interface ISubunitFilterViewModel {
  expandedKeys: TreeExpandedKeysType;

  get subunitTree(): TreeNode[];
  get selectedSubunits(): TreeCheckboxSelectionKeys;

  setExpandedKeys(keys: TreeExpandedKeysType): void;
  onExpandedKeysChange(e: TreeExpandedEvent): void;
  expandAll(): void;

  onSelectionChange(e: TreeSelectionEvent): void;
  selectAll(): void;
  selectNone(): void;
}

class ConcreteSubunitFilterViewModel implements ISubunitFilterViewModel {
  filter: SubunitFilteringStrategy;
  expandedKeys: TreeExpandedKeysType = {};

  constructor(filter: SubunitFilteringStrategy) {
    this.filter = filter;

    makeObservable(this, {
      filter: false,
      expandedKeys: observable,
      subunitTree: false,
      selectedSubunits: false,
      setExpandedKeys: action.bound,
      onExpandedKeysChange: action.bound,
      expandAll: action.bound,
      onSelectionChange: action.bound,
      selectAll: action.bound,
      selectNone: action.bound,
    });
  }

  get subunitTree() {
    return this.filter.subunitTree;
  }

  get selectedSubunits() {
    return this.filter.selectedSubunits;
  }

  setExpandedKeys(keys: TreeExpandedKeysType) {
    this.expandedKeys = keys;
  }
  onExpandedKeysChange(e: TreeExpandedEvent) {
    this.setExpandedKeys(e.value);
  }
  expandAll() {
    this.setExpandedKeys(
      Object.fromEntries(
        this.filter.subunitTree.map((entry) => [entry.key, true])
      )
    );
  }

  onSelectionChange(e: TreeSelectionEvent) {
    this.filter.setSelection(e.value as TreeCheckboxSelectionKeys);
  }
  selectAll() {
    this.filter.selectAll();
  }
  selectNone() {
    this.filter.selectNone();
  }
}

export const SubunitFilterViewModel = (filter: SubunitFilteringStrategy) =>
  new ConcreteSubunitFilterViewModel(filter) as ISubunitFilterViewModel;
