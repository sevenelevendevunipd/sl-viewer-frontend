import { createContext, useContext, PropsWithChildren } from "react";
import {
  LogParserResponse_4dfe1dd_LogEntry,
  LogParserResponse_4dfe1dd_LogFile,
} from "../openapi";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

export interface LogFilteringStrategy {
  filter(entries: LogEntry[]): LogEntry[];
  reset(): void;
}

export interface ILogFilteringService {
  register(filter: LogFilteringStrategy, ui: JSX.Element): void;
  get filteredEntries(): LogEntry[];
  resetAll(): void;
  setLogFile(logFile: LogFile): void;
  removeFilters(): void;
  get filtersUi(): JSX.Element[];
}

class ConcreteLogFilteringService implements ILogFilteringService {
  registeredFilters: LogFilteringStrategy[] = [];
  filterUIs: JSX.Element[] = [];
  logFile: LogFile | null = null;

  constructor() {
    makeObservable(this, {
      registeredFilters: observable,
      filterUIs: observable.shallow,
      logFile: observable,
      register: action.bound,
      filteredEntries: computed,
      setLogFile: action.bound,
      removeFilters: action.bound,
      resetAll: action.bound,
      filtersUi: computed,
    });
  }

  public register(filter: LogFilteringStrategy, ui: JSX.Element) {
    this.registeredFilters.push(filter);
    this.filterUIs.push(ui);
  }

  get filteredEntries() {
    return this.registeredFilters.reduce(
      (e, filter) => filter.filter(e),
      this.logFile?.log_entries || []
    );
  }

  setLogFile(logFile: LogFile) {
    this.logFile = logFile;
  }

  removeFilters() {
    this.filterUIs.length = 0;
    this.registeredFilters.length = 0;
  }

  resetAll() {
    this.registeredFilters.forEach((filter) => filter.reset());
  }

  get filtersUi() {
    return this.filterUIs;
  }
}

const LogFilteringServiceContext = createContext<
  ILogFilteringService | undefined
>(undefined);

const LogFilteringService = (props: PropsWithChildren) => {
  return (
    <LogFilteringServiceContext.Provider
      value={new ConcreteLogFilteringService()}
    >
      {props.children}
    </LogFilteringServiceContext.Provider>
  );
};

export default LogFilteringService;

export const useLogFilteringService = () => {
  const context = useContext(LogFilteringServiceContext);
  if (context === undefined) {
    throw new Error("Caller is not a child of LogFilteringService");
  }
  return context;
};

type ObserverProps = {
  filteringService: ILogFilteringService;
};

const FilterUiObserver = observer(
  ({ filteringService }: ObserverProps) => <>{filteringService.filtersUi.map(f => <>{f}</>)}</>
);

export const FilterUi = () => {
  const filteringService = useLogFilteringService();
  return <FilterUiObserver filteringService={filteringService} />;
};
