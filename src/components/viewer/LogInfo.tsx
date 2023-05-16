import { Card } from "primereact/card";
import { LogParserResponse_4dfe1dd_LogFile } from "../../openapi";
import InfoRow from "../InfoRow";

type LogInfoProps = {
  logFile: LogParserResponse_4dfe1dd_LogFile;
};

const LogInfo = (props: LogInfoProps): JSX.Element => (
  <div className="p-1 col-3">
    <Card className="h-full" title="Log Informations">
      <InfoRow caption="Log Filename" value={props.logFile.filename} />
      <InfoRow caption="PC Timestamp" value={props.logFile.pc_datetime} />
      <InfoRow caption="UPS Timestamp" value={props.logFile.ups_datetime} />
      <InfoRow
        caption="Total entries"
        value={props.logFile.log_entries.length}
      />
    </Card>
  </div>
);

export default LogInfo;
