import { useRef } from 'react';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import { DefaultService, LogParserResponse_4dfe1dd, LogParserError_581e5e4, ApiError } from '../openapi';
import { useApi } from '../utils';

declare interface LogUploaderProps {
    setLog(log: LogParserResponse_4dfe1dd): void;
}

function LogUploader(props: LogUploaderProps) {
    const toasts = useRef<Toast>(null);
    const { dismissError, error, isLoading, handleRequest } = useApi();

    const logFileUploader = (event: FileUploadHandlerEvent) => {
        if (event.files.length !== 1) {
            toasts.current?.show({
                severity: "error",
                closable: true,
                summary: "Error",
                content: "Select a log file."
            });
        }
        handleRequest(DefaultService.postApiAnalyzeLog({ log: event.files[0] })).then((log) => {
            if (log !== undefined) {
                props.setLog(log)
            }
        });
    };
    if (error !== undefined) {
        if (error instanceof ApiError) {
            const parser_error = error.body as LogParserError_581e5e4;
            toasts.current?.show({
                severity: "error",
                closable: true,
                summary: "Error",
                content: `${parser_error.errors.join(', ')}`
            });
        } else {
            toasts.current?.show({
                severity: "error",
                closable: true,
                summary: "Error",
                content: `Errore while uploading log file: ${error.name}: ${error.message}`
            });
        }
    }
    return (
        <Card className='max-w-30rem m-auto' title='Upload a log file'>
            <Toast ref={toasts} onHide={dismissError} />
            {isLoading ?
                <div className='flex justify-content-center'><ProgressSpinner className='m-auto'></ProgressSpinner></div> :
                <FileUpload name="log" accept="text/csv" customUpload uploadHandler={logFileUploader} disabled={isLoading} />}
        </Card>
    )
}

export default LogUploader;