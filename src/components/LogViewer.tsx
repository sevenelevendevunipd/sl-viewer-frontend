import { useState, useMemo, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ListBox } from 'primereact/listbox';
import { Tree, TreeCheckboxSelectionKeys, TreeExpandedKeysType } from 'primereact/tree';

import { LogParserResponse_4dfe1dd } from "../openapi";
import { selectAllTreeEntries } from "../utils"
import { Button } from 'primereact/button';

declare interface LogViewerProps {
    log: LogParserResponse_4dfe1dd
}

function hashUnitSubUnit(unit: number, subunit: number) {
    return (unit << 4) | subunit;
}

function LogViewer(props: LogViewerProps) {
    const [selectedKeys, setSelectedKeys] = useState<TreeCheckboxSelectionKeys>({});
    const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({});
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [logFile] = useState(props.log.log);
    const logEntries = logFile.log_entries;

    const treeEntries = useMemo(() => {
        return Object.entries(logFile.units_subunits).map(([unit, value]) => {
            return {
                key: unit,
                label: `Unit ${unit}: ${value.ini_file}`,
                children: Object.entries(value.subunits!).map(([subUnit, name]) => {
                    return {
                        key: `s${hashUnitSubUnit(parseInt(unit), parseInt(subUnit))}`,
                        label: `Unit ${unit} SubUnit ${subUnit}: ${name}`
                    }
                })
            }
        });
    }, [logFile.units_subunits]);

    const selectedSubUnits = useMemo(() => {
        return new Set(Object.keys(selectedKeys).filter(k => k.startsWith('s')).map(k => parseInt(k.substring(1))));
    }, [selectedKeys])

    const filterableCodes = useMemo(() => {
        return [...new Set(logEntries.map(entry => entry.code))].sort()
    }, [logEntries])

    const filteredLogEntries = useMemo(() => {
        return logEntries.filter(
            entry => selectedSubUnits.has(entry.unit_subunit_id) && selectedCodes.includes(entry.code)
        )
    }, [selectedSubUnits, selectedCodes, logEntries])

    const selectAllCodes = () => {
        setSelectedCodes(filterableCodes);
    }

    const unselectAllCodes = () => {
        setSelectedCodes([]);
    }

    const selectAllSubunits = () => {
        selectAllTreeEntries(treeEntries, setSelectedKeys)
    }

    const unselectAllSubunits = () => {
        setSelectedKeys({});
    }

    useEffect(selectAllSubunits, [treeEntries]);

    useEffect(() => { // expands all tree entries on load
        setExpandedKeys(Object.fromEntries(treeEntries.map(entry => [entry.key, true])))
    }, [treeEntries])

    useEffect(selectAllCodes, [filterableCodes]);

    const unitCardTitle = (<div className='flex align-items-center justify-content-between'>
        Filter by Unit/SubUnit
        <div>
            <Button className='mx-4' label="Select All" onClick={selectAllSubunits} />
            <Button className='mx-4' label="Select None" onClick={unselectAllSubunits} />
        </div>
    </div>)

    const codeCardTitle = (<div className='flex align-items-center justify-content-between'>
        Filter by Code
        <div>
            <Button className='mx-4' label="Select All" onClick={selectAllCodes} />
            <Button className='mx-4' label="Select None" onClick={unselectAllCodes} />
        </div>
    </div>)

    return (
        <div>
            <div className='grid m-4'>
                <div className='p-1 col-3'>
                    <Card title="Log Informations">
                        <dl>
                            <dt className='font-bold'>Log Filename</dt>
                            <dd>{logFile.filename}</dd>
                            <dt className='font-bold'>PC Timestamp</dt>
                            <dd>{logFile.pc_datetime}</dd>
                            <dt className='font-bold'>UPS Timestamp</dt>
                            <dd>{logFile.ups_datetime}</dd>
                            <dt className='font-bold'>Total entries</dt>
                            <dd>{logEntries.length}</dd>
                        </dl>
                    </Card>
                </div>
                <div className='p-1 col-5'>
                    <Card title={unitCardTitle}>
                        <Tree value={treeEntries} selectionMode="checkbox" selectionKeys={selectedKeys}
                            onSelectionChange={(e) => setSelectedKeys(e.value as TreeCheckboxSelectionKeys)}
                            expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} />
                    </Card>
                </div>
                <div className='p-1 col-4'>
                    <Card title={codeCardTitle}>
                        <ListBox options={filterableCodes} multiple filter value={selectedCodes} onChange={(e) => setSelectedCodes(e.value)} listStyle={{ height: '300px' }} />
                    </Card>
                </div>
            </div>
            <div className="w-max xl:w-10 m-auto">
                <DataTable value={filteredLogEntries} removableSort sortField='timestamp' size='large' header={`Showing ${filteredLogEntries.length} log entries`}
                    showGridlines responsiveLayout="scroll" paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}>
                    <Column key="unit_subunit_id" field="unit_subunit_id" hidden />

                    <Column key="timestamp" field="timestamp" header="Timestamp" style={{ width: '15%' }} sortable />
                    <Column key="unit" field="unit" header="Unit" style={{ width: '7%' }} sortable />
                    <Column key="subunit" field="subunit" header="SubUnit" style={{ width: '7%' }} sortable />
                    <Column key="ini_filename" field="ini_filename" header="Device" style={{ width: '18%' }} sortable />
                    <Column key="code" field="code" header="Code" style={{ width: '15%' }} sortable />
                    <Column key="description" field="description" header="Description" style={{ width: '15%' }} sortable />
                    <Column key="value" field="value" header="Value" style={{ width: '23%' }} sortable />
                </DataTable>
            </div>
        </div>
    );
}

export default LogViewer;