import { useState, useEffect } from "react";

import { LogParserResponse_4dfe1dd_LogFile } from "../openapi";
import {
  FilterUi,
  useLogFilteringService,
} from "../services/LogFilteringService";
import { CodeFilteringStrategy } from "../filters/CodeFilter";
import { CodeFilterUi } from "./filter/CodeFilterUi";
import { FirmwareFilteringStrategy } from "../filters/FirmwareFilter";
import { FirmwareFilterUi } from "./filter/FirmwareFilterUi";
import { SubunitFilteringStrategy } from "../filters/SubunitFilter";
import { SubunitFilterUi } from "./filter/SubunitFilterUi";
import LogInfo from "./viewer/LogInfo";
import { LogData } from "./viewer/LogData";

declare interface LogViewerProps {
  log: LogParserResponse_4dfe1dd_LogFile;
}

function LogViewer(props: LogViewerProps) {
  const [logFile] = useState(props.log);
  const filteringService = useLogFilteringService();

  useEffect(() => {
    filteringService.setLogFile(logFile);

    const codeFilter = new CodeFilteringStrategy(logFile);
    filteringService.register(codeFilter, CodeFilterUi(codeFilter));

    const FirmwareFilter = new FirmwareFilteringStrategy(logFile);
    filteringService.register(FirmwareFilter, FirmwareFilterUi(FirmwareFilter));

    const subunitFilter = new SubunitFilteringStrategy(logFile);
    filteringService.register(subunitFilter, SubunitFilterUi(subunitFilter));



    return filteringService.removeFilters;
  }, [logFile]);

  return (
    <div>
      <div className="grid m-4 align-items-stretch">
        <LogInfo logFile={logFile} />
        <FilterUi />
      </div>
      <LogData />
    </div>
  );
}

export default LogViewer;
