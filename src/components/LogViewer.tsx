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
    const datetimeFilterViewModel = DateTimeFilterViewModel(datetimeFilter);
    filteringService.register(
      datetimeFilter,
      DateTimeFilterView(datetimeFilterViewModel)
    );

    const eventSequenceFilter = new EventSequenceFilteringStrategy(logFile);
    const eventSequenceFilterViewModel =
      EventSequenceFilterViewModel(eventSequenceFilter);
    filteringService.register(
      eventSequenceFilter,
      EventSequenceFilterView(eventSequenceFilterViewModel)
    );

    const firmwareFilter = new FirmwareFilteringStrategy(logFile);
    const firmwareFilterViewModel = FirmwareFilterViewModel(firmwareFilter);
    filteringService.register(
      firmwareFilter,
      FirmwareFilterView(firmwareFilterViewModel)
    );

    const codeFilter = new CodeFilteringStrategy(logFile);
    const codeFilterViewModel = CodeFilterViewModel(codeFilter);
    filteringService.register(codeFilter, CodeFilterView(codeFilterViewModel));

    const subunitFilter = new SubunitFilteringStrategy(logFile);
    const subunitFilterViewModel = SubunitFilterViewModel(subunitFilter);
    filteringService.register(
      subunitFilter,
      SubunitFilterView(subunitFilterViewModel)
    );

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
