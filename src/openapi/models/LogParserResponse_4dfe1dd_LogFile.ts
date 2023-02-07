/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LogParserResponse_4dfe1dd_LogEntry } from './LogParserResponse_4dfe1dd_LogEntry';
import type { LogParserResponse_4dfe1dd_Unit } from './LogParserResponse_4dfe1dd_Unit';

export type LogParserResponse_4dfe1dd_LogFile = {
    filename: string;
    pc_datetime: string;
    ups_datetime: string;
    units_subunits: Record<string, LogParserResponse_4dfe1dd_Unit>;
    log_entries: Array<LogParserResponse_4dfe1dd_LogEntry>;
};

