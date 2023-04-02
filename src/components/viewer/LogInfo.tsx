import { Card } from "primereact/card";
import { LogParserResponse_4dfe1dd_LogFile } from "../../openapi";

type LogInfoProps = {
    logFile: LogParserResponse_4dfe1dd_LogFile,
};

const LogInfo = (props: LogInfoProps): JSX.Element => <div className='p-1 col-3'>
<Card className='h-full' title="Log Informations">
    <dl>
        <dt className='font-bold'>Log Filename</dt>
        <dd>{props.logFile.filename}</dd>
        <dt className='font-bold'>PC Timestamp</dt>
        <dd>{props.logFile.pc_datetime}</dd>
        <dt className='font-bold'>UPS Timestamp</dt>
        <dd>{props.logFile.ups_datetime}</dd>
        <dt className='font-bold'>Total entries</dt>
        <dd>{props.logFile.log_entries.length}</dd>
    </dl>
</Card>
</div>;

export default LogInfo;