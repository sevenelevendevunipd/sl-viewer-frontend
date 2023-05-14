import { useState, useEffect } from "react";

import { LogParserResponse_4dfe1dd_LogFile } from "../openapi";
import {
  FilterUi,
  useLogFilteringService,
} from "../services/LogFilteringService";
import { CodeFilteringStrategy } from "../filters/CodeFilter";
import { CodeFilterView } from "../views/filters/CodeFilterView";
import { EventSequenceFilteringStrategy } from "../filters/EventSequenceFilter";
import { EventSequenceFilterView } from "../views/filters/EventSequenceFilterView";
import { FirmwareFilteringStrategy } from "../filters/FirmwareFilter";
import { FirmwareFilterView as FirmwareFilterView } from "../views/filters/FirmwareFilterView";
import { SubunitFilteringStrategy } from "../filters/SubunitFilter";
import { SubunitFilterView } from "../views/filters/SubunitFilterView";
import { DateTimeFilteringStrategy } from "../filters/DateTimeFilter";
import { DateTimeFilterView } from "../views/filters/DateTimeFilterView";
import LogInfo from "./viewer/LogInfo";
import { LogData } from "./viewer/LogData";
import { CodeFilterViewModel } from "../viewmodels/filters/CodeFilterViewModel";
import { DateTimeFilterViewModel } from "../viewmodels/filters/DateTimeFilterViewModel";
import { FirmwareFilterViewModel } from "../viewmodels/filters/FirmwareFilterViewModel";
import { SubunitFilterViewModel } from "../viewmodels/filters/SubunitFilterViewModel";
import { EventSequenceFilterViewModel } from "../viewmodels/filters/EventSequenceFilterViewModel";

declare interface LogViewerProps {
  log: LogParserResponse_4dfe1dd_LogFile;
}

function LogViewer(props: LogViewerProps) {
  const [logFile] = useState(props.log);
  const filteringService = useLogFilteringService();

  useEffect(() => {
    filteringService.setLogFile(logFile);

    const datetimeFilter = new DateTimeFilteringStrategy(logFile);
    filteringService.register(datetimeFilter, DateTimeFilterView(DateTimeFilterViewModel(datetimeFilter)));

    const subFilter = new EventSequenceFilteringStrategy(logFile);
    filteringService.register(subFilter, EventSequenceFilterView(EventSequenceFilterViewModel(subFilter)));

    const firmwareFilter = new FirmwareFilteringStrategy(logFile);
    filteringService.register(firmwareFilter, FirmwareFilterView(FirmwareFilterViewModel(firmwareFilter)));

    const codeFilter = new CodeFilteringStrategy(logFile);
    filteringService.register(codeFilter, CodeFilterView(CodeFilterViewModel(codeFilter)));

    const subunitFilter = new SubunitFilteringStrategy(logFile);
    filteringService.register(subunitFilter, SubunitFilterView(SubunitFilterViewModel(subunitFilter)));

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
