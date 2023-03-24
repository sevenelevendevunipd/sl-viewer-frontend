import { Card } from 'primereact/card';
import { Tree, TreeCheckboxSelectionKeys, TreeExpandedKeysType } from 'primereact/tree';
import { Button } from 'primereact/button';
import { observer } from 'mobx-react-lite';
import { SubunitFilteringStrategy } from '../../filters/SubunitFilter';
import { useEffect, useState } from 'react';

type ObserverProps = {
    filter: SubunitFilteringStrategy,
    subunitCardTitle: JSX.Element,
};

const SubunitFilterObserverUi = observer(({ filter, subunitCardTitle }: ObserverProps) => {
    const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({});
    useEffect(() => {
        setExpandedKeys(Object.fromEntries(filter.subunitTree.map(entry => [entry.key, true])))
    }, [filter.subunitTree])
    return <div className='p-1 col-5'>
        <Card className='h-full' title={subunitCardTitle}>
            <Tree value={filter.subunitTree} selectionMode="checkbox" selectionKeys={filter.selectedSubunits}
                onSelectionChange={(e) => filter.selectedSubunits = (e.value as TreeCheckboxSelectionKeys)}
                expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} />
        </Card>
    </div>
});

export const SubunitFilterUi = (filter: SubunitFilteringStrategy) => {
    const subunitCardTitle = (<div className='flex align-items-center justify-content-between'>
        Filter by Unit/SubUnit
        <div>
            <Button className='mx-4' label="Select All" onClick={filter.selectAll} />
            <Button className='mx-4' label="Select None" onClick={filter.selectNone} />
        </div>
    </div>)
    return <SubunitFilterObserverUi filter={filter} subunitCardTitle={subunitCardTitle} />;
}