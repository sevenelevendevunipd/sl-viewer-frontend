import { createContext, useContext } from "react";
import { ApiError, DefaultService, LogParserError_581e5e4, LogParserResponse_4dfe1dd } from "../openapi";

export class LogParsingError extends Error {
    message: string;
    constructor (message: string) {
        super()
        this.message = message
    }
}

type LogParserResponse = LogParserResponse_4dfe1dd;

export interface ILogParsingService {
    parse(files: File[]): Promise<LogParserResponse>;
}

const LogParsingServiceContext = createContext<ILogParsingService | undefined>(undefined);

interface WithChildrenProps {
    children: JSX.Element[] | JSX.Element
}

const LogParsingService = (props: WithChildrenProps) => {
    const logParsingService = {
        async parse(files: File[]): Promise<LogParserResponse> {
            if (files.length !== 1) {
                throw new LogParsingError("Select a log file.");
            }
            const file = files[0];
            try {
                return DefaultService.postApiAnalyzeLog({log: file})
            } catch (error) {
                if (error instanceof ApiError) {
                    const parser_error = error.body as LogParserError_581e5e4;
                    throw new LogParsingError(parser_error.errors.join(', '))
                } else if (error instanceof TypeError) {
                    throw new LogParsingError(`Error while uploading log file: ${error.name}: ${error.message}`);
                } else {
                    throw new LogParsingError(`Error while uploading log file: ${error}`);
                }
            }
        }
    }

    return (
        <LogParsingServiceContext.Provider value={logParsingService}>
            {props.children}
        </LogParsingServiceContext.Provider>
        );
}

export default LogParsingService;

export const useLogParsingService = () => {
    const context = useContext(LogParsingServiceContext);
    if (context === undefined) {
        throw new Error("Caller is not a child of LogParsingService.");
    }
    return context;
};