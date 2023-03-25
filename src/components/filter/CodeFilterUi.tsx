import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { observer } from 'mobx-react-lite';
import { CodeFilteringStrategy } from '../../filters/CodeFilter';

type ObserverProps = {
    filter: CodeFilteringStrategy,
};

const CodeFilterObserverUi = observer(({ filter }: ObserverProps) =>
    <ListBox options={filter.filterableCodes} multiple filter value={filter.selectedCodes} onChange={(e) => filter.selectedCodes = e.value} listStyle={{ height: '300px' }} />
);

export const CodeFilterUi = (filter: CodeFilteringStrategy) => {
    const codeCardTitle = (<div className='flex align-items-center justify-content-between'>
        Filter by Code
        <div>
            <Button className='mx-4' label="Select All" onClick={filter.selectAll} />
            <Button className='mx-4' label="Select None" onClick={filter.selectNone} />
        </div>
    </div>)
    return <div className='p-1 col-4'>
        <Card className='h-full' title={codeCardTitle}>
            <CodeFilterObserverUi filter={filter} />
        </Card>
    </div>;
}