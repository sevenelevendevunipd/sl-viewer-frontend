/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogParserResponse_4dfe1dd } from '../models/LogParserResponse_4dfe1dd';
import type { LogUpload_f5eab8c } from '../models/LogUpload_f5eab8c';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LogParsingService {

    /**
     * parse_log <POST>
     * @param formData
     * @returns LogParserResponse_4dfe1dd OK
     * @throws ApiError
     */
    public static postApiParseLog(
        formData?: LogUpload_f5eab8c,
    ): CancelablePromise<LogParserResponse_4dfe1dd> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/parse_log',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                422: `Unprocessable Entity`,
            },
        });
    }

}
