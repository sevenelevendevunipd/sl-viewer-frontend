import { observer } from "mobx-react-lite";
import { Card } from "primereact/card";
import { ILogFilteringService, useLogFilteringService } from "../../services/LogFilteringService";
import { LogTable } from "./LogTable";
import { Timeline } from "./Timeline";

type ObserverProps = {
    filteringService: ILogFilteringService
};
export const LogDataObserver = observer(({ filteringService }: ObserverProps) => <>
    <Card title='Chart (fake data)' className='w-auto m-4'>
        <Timeline logEntries={(filteringService.filteredEntries)} />
    </Card>
    <div className="w-max xl:w-10 m-auto">
        <LogTable/>
    </div>
</>);

export const LogData = () => {
    const filteringService = useLogFilteringService();
    return <LogDataObserver filteringService={filteringService}/>;
}