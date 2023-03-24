import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { observer } from 'mobx-react-lite';
import { CodeFilteringStrategy } from '../../filters/CodeFilter';

type ObserverProps = {
    filter: CodeFilteringStrategy,
    codeCardTitle: JSX.Element,
};

const CodeFilterObserverUi = observer(({filter, codeCardTitle}: ObserverProps) => <div className='p-1 col-4'>
<Card className='h-full' title={codeCardTitle}>
    <ListBox options={filter.filterableCodes} multiple filter value={filter.selectedCodes} onChange={(e) => filter.selectedCodes = e.value} listStyle={{ height: '300px' }} />
</Card>
</div>);

export const CodeFilterUi = (filter: CodeFilteringStrategy) => {
    const codeCardTitle = (<div className='flex align-items-center justify-content-between'>
        Filter by Code
        <div>
            <Button className='mx-4' label="Select All" onClick={filter.selectAll} />
            <Button className='mx-4' label="Select None" onClick={filter.selectNone} />
        </div>
    </div>)
    return <CodeFilterObserverUi filter={filter} codeCardTitle={codeCardTitle}/>;
}