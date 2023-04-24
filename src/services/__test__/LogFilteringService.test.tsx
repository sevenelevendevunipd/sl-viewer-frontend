import { log } from "console";
import LogFilteringService, { ConcreteLogFilteringService, LogFilteringStrategy, useLogFilteringService } from "../LogFilteringService";
import {
    LogParserResponse_4dfe1dd_LogEntry,
    LogParserResponse_4dfe1dd_LogFile,
  } from "../../openapi";
import logs from "../../filters/__test__/logs.json";
import { Key } from "react";
import { createContext } from "vm";
import { useContext } from "react";
import { render } from "@testing-library/react";
import { FilterUi } from "../LogFilteringService";


type LogFile = LogParserResponse_4dfe1dd_LogFile;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry;

class LFS implements LogFilteringStrategy{
    filter(entries: LogEntry[]){
        return entries;
    }

    reset(){return;}
}

describe("ConcreteLogFilteringService", () => {

    const logFile: LogFile = logs;
    let logFilteringService: ConcreteLogFilteringService;
    let lfs: LFS;
    let ui = <span>hello world</span>;

    beforeEach(() => {
        logFilteringService = new ConcreteLogFilteringService();
        lfs = new LFS();
    });

    describe("register", () => {
        it("should insert fliter and ui in the lists", () =>{
            logFilteringService.register(lfs, ui);
            expect(logFilteringService.registeredFilters.length).toEqual(1);
            expect(logFilteringService.filterUIs.length).toEqual(1);

        });
    });

    describe("filteredEntries", () => {
        it("should filter entries", () => {
            logFilteringService.setLogFile(logFile);
            logFilteringService.register(lfs, ui);
            expect(logFilteringService.filteredEntries).toEqual([
                {
                    timestamp: "2021-01-16T00:00:00.000000",
                    unit: 3,
                    subunit: 1,
                    unit_subunit_id: 1,
                    ini_filename: "firmware1",
                    code: "A",
                    description: "string",
                    value: "string",
                    type_um: "string",
                    snapshot: "string",
                    color: "string"
                },
                {
                    timestamp: "2021-01-02T00:00:00.000000",
                    unit: 3,
                    subunit: 1,
                    unit_subunit_id: 1,
                    ini_filename: "firmware2",
                    code: "B",
                    description: "string",
                    value: "string",
                    type_um: "string",
                    snapshot: "string",
                    color: "string"
                },
                {
                    timestamp: "2021-01-01T01:00:00.000000",
                    unit: 3,
                    subunit: 1,
                    unit_subunit_id: 1,
                    ini_filename: "firmware3",
                    code: "C",
                    description: "string",
                    value: "string",
                    type_um: "string",
                    snapshot: "string",
                    color: "string"
                }
            ]);
        });
    });

    describe("setLogFile", () => {
        it("should set the log file", () => {
            logFilteringService.setLogFile(logFile);
            expect(logFilteringService.logFile).toEqual(logFile);
        });
    });

    describe("remove filters", () =>{
        it("should remove all filter", () => {
            logFilteringService.removeFilters();
            expect(logFilteringService.filterUIs.length).toEqual(0);
            expect(logFilteringService.registeredFilters.length).toEqual(0);
        });
    });

    describe("reset all", () => {
        it("should resete all filter", () => {

            const filtro = {
                filter: jest.fn(),
                reset: jest.fn(),
            };

            logFilteringService.register(filtro, ui);
            logFilteringService.resetAll();
            
            expect(filtro.reset).toHaveBeenCalled();
        })
    });

    describe("filterUi", () => {
        it("should return filterUIs", ()  => {
            expect(logFilteringService.filtersUi).toEqual(logFilteringService.filterUIs);
        })
    });
   
});




