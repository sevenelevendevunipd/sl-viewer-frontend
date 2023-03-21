import { TreeCheckboxSelectionKeys } from 'primereact/tree';
import TreeNode from 'primereact/treenode';


function selectTreeEntry(entry: TreeNode, _selectedEntries: TreeCheckboxSelectionKeys): void {
    _selectedEntries[entry.key!] = { partialChecked: false, checked: true }; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    entry.children?.forEach((child) => selectTreeEntry(child, _selectedEntries));
}

interface ISetSelectedKeys {
    (keys: TreeCheckboxSelectionKeys): void
}

export function selectAllTreeEntries(entries: TreeNode[], setSelectedKeys: ISetSelectedKeys): void {
    const _selectedEntries: TreeCheckboxSelectionKeys = {};
    entries.forEach((entry) => {
        selectTreeEntry(entry, _selectedEntries)
    });
    setSelectedKeys(_selectedEntries);
}

export function groupBy<T, K extends string | number | symbol>(elements: T[], indexer: (element: T) => K): Record<K, T[]>{
    return elements.reduce((elems, elem) => {
        const index = indexer(elem);
        elems[index] = [...(elems[index] || []), elem];
        return elems;
    }, {} as Record<K, T[]>);
}