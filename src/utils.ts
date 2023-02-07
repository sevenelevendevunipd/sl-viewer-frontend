import { useCallback, useState } from 'react'
import { ApiError, OpenAPI } from './openapi'
import { TreeCheckboxSelectionKeys } from 'primereact/tree';
import TreeNode from 'primereact/treenode';

export function useApi() {

    const [error, setError] = useState<ApiError | TypeError | undefined>(undefined)
    const [isLoading, setIsloading] = useState<boolean>(false)


    OpenAPI.BASE = ENV.URL_BASE;
    const handleRequest = useCallback(async function <T>(request: Promise<T>) {
        setIsloading(true)
        try {
            const response = await request
            setError(undefined)
            return response
        } catch (error) {
            setError(error as ApiError | TypeError)
        } finally {
            setIsloading(false)
        }
    }, [])

    function dismissError() {
        setError(undefined)
    }

    return { dismissError, error, isLoading, handleRequest }
}

function selectTreeEntry(entry: TreeNode, _selectedEntries: TreeCheckboxSelectionKeys): void {
    _selectedEntries[entry.key!] = { partialChecked: false, checked: true };
    entry.children?.forEach((child) => selectTreeEntry(child, _selectedEntries));
}

interface ISetSelectedKeys {
    (keys: TreeCheckboxSelectionKeys): void
}

export function selectAllTreeEntries(entries: TreeNode[], setSelectedKeys: ISetSelectedKeys): void {
    let _selectedEntries: TreeCheckboxSelectionKeys = {};
    entries.forEach((entry) => {
        selectTreeEntry(entry, _selectedEntries)
    });
    setSelectedKeys(_selectedEntries);
};