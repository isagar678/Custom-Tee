import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get Api User Data
     *
     */
    get_api_user_data_user__get(): Promise<FetchResponse<200, types.GetApiUserDataUserGetResponse200>>;
    /**
     * Get Creations
     *
     * @throws FetchError<422, types.GetCreationsCreationsGetResponse422> Validation Error
     */
    get_creations_creations__get(metadata?: types.GetCreationsCreationsGetMetadataParam): Promise<FetchResponse<200, types.GetCreationsCreationsGetResponse200>>;
    /**
     * New Creation
     *
     * @throws FetchError<422, types.NewCreationCreationsPostResponse422> Validation Error
     */
    new_creation_creations__post(body: types.NewCreationCreationsPostBodyParam): Promise<FetchResponse<200, types.NewCreationCreationsPostResponse200>>;
    /**
     * Get Creation
     *
     * @throws FetchError<422, types.GetCreationCreationsCreationIdGetResponse422> Validation Error
     */
    get_creation_creations__creation_id__get(metadata: types.GetCreationCreationsCreationIdGetMetadataParam): Promise<FetchResponse<200, types.GetCreationCreationsCreationIdGetResponse200>>;
}
declare const createSDK: SDK;
export default createSDK;
