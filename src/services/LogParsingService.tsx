import { createContext, useContext, PropsWithChildren } from "react";
import {
  ApiError,
  DefaultService,
  LogParserError_581e5e4,
  LogParserResponse_4dfe1dd,
  ValidationError_6a07bef,
} from "../openapi";

export class LogParsingError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

type LogParserResponse = LogParserResponse_4dfe1dd;

export interface ILogParsingService {
  parse(files: File[]): Promise<LogParserResponse>;
}

const LogParsingServiceContext = createContext<ILogParsingService | undefined>(
  undefined
);

const LogParsingService = (props: PropsWithChildren) => {
  const logParsingService = {
    async parse(files: File[]): Promise<LogParserResponse> {
      if (files.length !== 1) {
        throw new LogParsingError("Select a log file.");
      }
      const file = files[0];
      try {
        return await DefaultService.postApiAnalyzeLog({ log: file });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.body instanceof Array) {
            const validation_error = error.body as ValidationError_6a07bef;
            throw new LogParsingError(
              `Request validation error: ${validation_error
                .map((e) => `${e.msg}: [${e.loc.join(",")}]`)
                .join("\n")}`
            );
          } else {
            const parser_error = error.body as LogParserError_581e5e4;
            throw new LogParsingError(parser_error.errors.join(", "));
          }
        } else if (error instanceof TypeError) {
          throw new LogParsingError(
            `Error while uploading log file: ${error.name}: ${error.message}`
          );
        } else {
          throw new LogParsingError(`Error while uploading log file: ${error}`);
        }
      }
    },
  };

  return (
    <LogParsingServiceContext.Provider value={logParsingService}>
      {props.children}
    </LogParsingServiceContext.Provider>
  );
};

export default LogParsingService;

export const useLogParsingService = () => {
  const context = useContext(LogParsingServiceContext);
  if (context === undefined) {
    throw new Error("Caller is not a child of LogParsingService.");
  }
  return context;
};
