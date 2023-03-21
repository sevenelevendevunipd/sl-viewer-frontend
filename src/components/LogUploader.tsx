import { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import { LogParserResponse_4dfe1dd} from '../openapi';
import { LogParsingError, useLogParsingService } from '../services/LogParsingService';

declare interface LogUploaderProps {
    setLog(log: LogParserResponse_4dfe1dd): void;
}

function LogUploader(props: LogUploaderProps) {
    const toasts = useRef<Toast>(null);
    const logParsingService = useLogParsingService();
    const [isLoading, setLoading] = useState(false);


    const logFileUploader = (event: FileUploadHandlerEvent) => {
        setLoading(true);
        logParsingService.parse(event.files).then(props.setLog, (error: LogParsingError) => {
            toasts.current?.show({
                severity: "error",
                closable: true,
                summary: "Error",
                content: error.message,
            });
        }).finally(() => setLoading(false))
    };
    
    return (
        <div className='grid'>
            <Card className='m-auto col-4' title='Upload a log file'>
                <Toast ref={toasts} />
                {isLoading ?
                    <div className='flex justify-content-center'><ProgressSpinner className='m-auto'></ProgressSpinner></div> :
                    <FileUpload name="log" accept="text/csv" customUpload uploadHandler={logFileUploader} />}
            </Card>
        </div>
    )
}

export default LogUploader;