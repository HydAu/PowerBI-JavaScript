/*! powerbi-client v2.3.1 | (c) 2016 Microsoft Corporation MIT */
import * as service from './service';
import * as models from 'powerbi-models';
declare global  {
    interface Document {
        mozCancelFullScreen: Function;
        msExitFullscreen: Function;
    }
    interface HTMLIFrameElement {
        mozRequestFullScreen: Function;
        msRequestFullscreen: Function;
    }
}
/**
 * Configuration settings for Power BI embed components
 *
 * @export
 * @interface IEmbedConfiguration
 */
export interface IEmbedConfiguration {
    type?: string;
    id?: string;
    uniqueId?: string;
    embedUrl?: string;
    accessToken?: string;
    settings?: models.ISettings;
    pageName?: string;
    filters?: models.IFilter[];
    pageView?: models.PageView;
    datasetId?: string;
    permissions?: models.Permissions;
    viewMode?: models.ViewMode;
    tokenType?: models.TokenType;
    action?: string;
    dashboardId?: string;
    height?: number;
    width?: number;
}
export interface IInternalEmbedConfiguration extends models.IReportLoadConfiguration {
    uniqueId: string;
    type: string;
    embedUrl: string;
    height?: number;
    width?: number;
    action?: string;
}
export interface IInternalEventHandler<T> {
    test(event: service.IEvent<T>): boolean;
    handle(event: service.ICustomEvent<T>): void;
}
/**
 * Base class for all Power BI embed components
 *
 * @export
 * @abstract
 * @class Embed
 */
export declare abstract class Embed {
    static allowedEvents: string[];
    static accessTokenAttribute: string;
    static embedUrlAttribute: string;
    static nameAttribute: string;
    static typeAttribute: string;
    static type: string;
    private static defaultSettings;
    allowedEvents: any[];
    /**
     * Gets or sets the event handler registered for this embed component.
     *
     * @type {IInternalEventHandler<any>[]}
     */
    eventHandlers: IInternalEventHandler<any>[];
    /**
     * Gets or sets the Power BI embed service.
     *
     * @type {service.Service}
     */
    service: service.Service;
    /**
     * Gets or sets the HTML element that contains the Power BI embed component.
     *
     * @type {HTMLElement}
     */
    element: HTMLElement;
    /**
     * Gets or sets the HTML iframe element that renders the Power BI embed component.
     *
     * @type {HTMLIFrameElement}
     */
    iframe: HTMLIFrameElement;
    /**
     * Gets or sets the configuration settings for the Power BI embed component.
     *
     * @type {IInternalEmbedConfiguration}
     */
    config: IInternalEmbedConfiguration;
    /**
     * Gets or sets the configuration settings for creating report.
     *
     * @type {models.IReportCreateConfiguration}
     */
    createConfig: models.IReportCreateConfiguration;
    /**
     * Url used in the load request.
     */
    loadPath: string;
    /**
     * Type of embed
     */
    embeType: string;
    /**
     * Creates an instance of Embed.
     *
     * Note: there is circular reference between embeds and the service, because
     * the service has a list of all embeds on the host page, and each embed has a reference to the service that created it.
     *
     * @param {service.Service} service
     * @param {HTMLElement} element
     * @param {IEmbedConfiguration} config
     */
    constructor(service: service.Service, element: HTMLElement, config: IEmbedConfiguration, iframe?: HTMLIFrameElement);
    /**
     * Sends createReport configuration data.
     *
     * ```javascript
     * createReport({
     *   datasetId: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
     * ```
     *
     * @param {models.IReportCreateConfiguration} config
     * @returns {Promise<void>}
     */
    createReport(config: models.IReportCreateConfiguration): Promise<void>;
    /**
     * Saves Report.
     *
     * @returns {Promise<void>}
     */
    save(): Promise<void>;
    /**
     * SaveAs Report.
     *
     * @returns {Promise<void>}
     */
    saveAs(saveAsParameters: models.ISaveAsParameters): Promise<void>;
    /**
     * Sends load configuration data.
     *
     * ```javascript
     * report.load({
     *   type: 'report',
     *   id: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
     *   settings: {
     *     navContentPaneEnabled: false
     *   },
     *   pageName: "DefaultPage",
     *   filters: [
     *     {
     *        ...  DefaultReportFilter ...
     *     }
     *   ]
     * })
     *   .catch(error => { ... });
     * ```
     *
     * @param {models.ILoadConfiguration} config
     * @returns {Promise<void>}
     */
    load(config: models.IReportLoadConfiguration | models.IDashboardLoadConfiguration): Promise<void>;
    /**
     * Removes one or more event handlers from the list of handlers.
     * If a reference to the existing handle function is specified, remove the specific handler.
     * If the handler is not specified, remove all handlers for the event name specified.
     *
     * ```javascript
     * report.off('pageChanged')
     *
     * or
     *
     * const logHandler = function (event) {
     *    console.log(event);
     * };
     *
     * report.off('pageChanged', logHandler);
     * ```
     *
     * @template T
     * @param {string} eventName
     * @param {service.IEventHandler<T>} [handler]
     */
    off<T>(eventName: string, handler?: service.IEventHandler<T>): void;
    /**
     * Adds an event handler for a specific event.
     *
     * ```javascript
     * report.on('pageChanged', (event) => {
     *   console.log('PageChanged: ', event.page.name);
     * });
     * ```
     *
     * @template T
     * @param {string} eventName
     * @param {service.IEventHandler<T>} handler
     */
    on<T>(eventName: string, handler: service.IEventHandler<T>): void;
    /**
     * Reloads embed using existing configuration.
     * E.g. For reports this effectively clears all filters and makes the first page active which simulates resetting a report back to loaded state.
     *
     * ```javascript
     * report.reload();
     * ```
     */
    reload(): Promise<void>;
    /**
     * Set accessToken.
     *
     * @returns {Promise<void>}
     */
    setAccessToken(accessToken: string): Promise<void>;
    /**
     * Gets an access token from the first available location: config, attribute, global.
     *
     * @private
     * @param {string} globalAccessToken
     * @returns {string}
     */
    private getAccessToken(globalAccessToken);
    /**
     * Populate config for create and load
     *
     * @private
     * @param {IEmbedConfiguration}
     * @returns {void}
     */
    private populateConfig(config);
    /**
     * Gets an embed url from the first available location: options, attribute.
     *
     * @private
     * @returns {string}
     */
    private getEmbedUrl();
    /**
     * Gets a unique ID from the first available location: options, attribute.
     * If neither is provided generate a unique string.
     *
     * @private
     * @returns {string}
     */
    private getUniqueId();
    /**
     * Gets the report ID from the first available location: options, attribute.
     *
     * @abstract
     * @returns {string}
     */
    abstract getId(): string;
    /**
     * Requests the browser to render the component's iframe in fullscreen mode.
     */
    fullscreen(): void;
    /**
     * Requests the browser to exit fullscreen mode.
     */
    exitFullscreen(): void;
    /**
     * Returns true if the iframe is rendered in fullscreen mode,
     * otherwise returns false.
     *
     * @private
     * @param {HTMLIFrameElement} iframe
     * @returns {boolean}
     */
    private isFullscreen(iframe);
    /**
     * Validate load and create configuration.
     */
    abstract validate(config: models.IReportLoadConfiguration | models.IDashboardLoadConfiguration | models.IReportCreateConfiguration): models.IError[];
    /**
     * Sets Iframe for embed
     */
    private setIframe(isLoad);
}
