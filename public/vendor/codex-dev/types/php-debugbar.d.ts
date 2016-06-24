
interface IPhpDebugBarWidget
{
    className?:string;
    $el?:JQuery;
    tagName?: string;
    defaults ?: {};



    render?: () => void;
    initialize? : (options:{}) => void;
    set?: (attr:string|{}, value:{}) => void;
    has?: (attr:string) => boolean;
    get?: (attr:string) => any;
    bindAttr?: (attr:string, cb:Function) => void;

    extend ?: (prop:{}) => IPhpDebugBarWidget;
}

interface IPhpDebugBarDebugBar extends IPhpDebugBarWidget
{

    controls ?: {};
    dataMap ?: {};
    datasets ?: {};
    firstTabName ?: string;
    activePanelName ?: string;
    datesetTitleFormater ?: any;

    /**
     * Register resize event, for resize debugbar with reponsive css.
     *
     * @this {DebugBar}
     */
    registerResizeHandler ?: () => void;

    /**
     * Resizes the debugbar to fit the current browser window
     */
    resize ?: () => void;

    /**
     * Initialiazes the UI
     *
     * @this {DebugBar}
     */
    render ?: () => void;

    /**
     * Sets the height of the debugbar body section
     * Forces the height to lie within a reasonable range
     * Stores the height in local storage so it can be restored
     * Resets the document body bottom offset
     *
     * @this {DebugBar}
     */
    setHeight ?: (height) => void;

    /**
     * Restores the state of the DebugBar using localStorage
     * This is not called by default in the constructor and
     * needs to be called by subclasses in their init() method
     *
     * @this {DebugBar}
     */
    restoreState ?: () => void;

    /**
     * Creates and adds a new tab
     *
     * @this {DebugBar}
     * @param {String} name Internal name
     * @param {Object} widget A widget object with an element property
     * @param {String} title The text in the tab, if not specified, name will be used
     * @return {Item}
     */
    createTab ?: (name, widget, title) => void;

    /**
     * Adds a new tab
     *
     * @this {DebugBar}
     * @param {String} name Internal name
     * @param {Item} tab Tab object
     * @return {Item}
     */
    addTab ?: (name, tab) => void;

    /**
     * Creates and adds an indicator
     *
     * @this {DebugBar}
     * @param {String} name Internal name
     * @param {String} icon
     * @param {String} tooltip
     * @param {String} position "right" or "left", default is "right"
     * @return {Indicator}
     */
    createIndicator ?: (name, icon, tooltip, position) => void;

    /**
     * Adds an indicator
     *
     * @this {DebugBar}
     * @param {String} name Internal name
     * @param {Indicator} indicator Indicator object
     * @return {Indicator}
     */
    addIndicator ?: (name, indicator, position) => void;

    /**
     * Returns a control
     *
     * @param {String} name
     * @return {Object}
     */
    getControl ?: (name) => void;

    /**
     * Checks if there's a control under the specified name
     *
     * @this {DebugBar}
     * @param {String} name
     * @return {Boolean}
     */
    isControl ?: (name) => void;

    /**
     * Checks if a tab with the specified name exists
     *
     * @this {DebugBar}
     * @param {String} name
     * @return {Boolean}
     */
    isTab ?: (name) => void;

    /**
     * Checks if an indicator with the specified name exists
     *
     * @this {DebugBar}
     * @param {String} name
     * @return {Boolean}
     */
    isIndicator ?: (name) => void;

    /**
     * Removes all tabs and indicators from the debug bar and hides it
     *
     * @this {DebugBar}
     */
    reset ?: () => void;

    /**
     * Open the debug bar and display the specified tab
     *
     * @this {DebugBar}
     * @param {String} name If not specified, display the first tab
     */
    showTab ?: (name) => void;

    /**
     * Hide panels and minimize the debug bar
     *
     * @this {DebugBar}
     */
    minimize ?: () => void;

    /**
     * Checks if the panel is minimized
     *
     * @return {Boolean}
     */
    isMinimized ?: () => void;

    /**
     * Close the debug bar
     *
     * @this {DebugBar}
     */
    close ?: () => void;

    /**
     * Restore the debug bar
     *
     * @this {DebugBar}
     */
    restore ?: () => void;

    /**
     * Recomputes the padding-bottom css property of the body so
     * that the debug bar never hides any content
     */
    recomputeBottomOffset ?: () => void;

    /**
     * Sets the data map used by dataChangeHandler to populate
     * indicators and widgets
     *
     * A data map is an object where properties are control names.
     * The value of each property should be an array where the first
     * item is the name of a property from the data object (nested properties
     * can be specified) and the second item the default value.
     *
     * Example:
     *     {"memory": ["memory.peak_usage_str", "0B"]}
     *
     * @this {DebugBar}
     * @param {Object} map
     */
    setDataMap ?: (map) => void;

    /**
     * Same as setDataMap() but appends to the existing map
     * rather than replacing it
     *
     * @this {DebugBar}
     * @param {Object} map
     */
    addDataMap ?: (map) => void;

    /**
     * Resets datasets and add one set of data
     *
     * For this method to be usefull, you need to specify
     * a dataMap using setDataMap()
     *
     * @this {DebugBar}
     * @param {Object} data
     * @return {String} Dataset's id
     */
    setData ?: (data) => void;

    /**
     * Adds a dataset
     *
     * If more than one dataset are added, the dataset selector
     * will be displayed.
     *
     * For this method to be usefull, you need to specify
     * a dataMap using setDataMap()
     *
     * @this {DebugBar}
     * @param {Object} data
     * @param {String} id The name of this set, optional
     * @param {String} suffix
     * @return {String} Dataset's id
     */
    addDataSet ?: (data, id, suffix) => void;

    /**
     * Loads a dataset using the open handler
     *
     * @param {String} id
     */
    loadDataSet ?: (id, suffix, callback) => void;

    /**
     * Returns the data from a dataset
     *
     * @this {DebugBar}
     * @param {String} id
     * @return {Object}
     */
    getDataSet ?: (id) => void;

    /**
     * Switch the currently displayed dataset
     *
     * @this {DebugBar}
     * @param {String} id
     */
    showDataSet ?: (id) => void;

    /**
     * Called when the current dataset is modified.
     *
     * @this {DebugBar}
     * @param {Object} data
     */
    dataChangeHandler ?: (data) => void;

    /**
     * Sets the handler to open past dataset
     *
     * @this {DebugBar}
     * @param {object} handler
     */
    setOpenHandler ?: (handler) => void;

    /**
     * Returns the handler to open past dataset
     *
     * @this {DebugBar}
     * @return {object}
     */
    getOpenHandler: () => {};
}
interface IPhpDebugBarAjaxHandler extends IPhpDebugBarWidget
{

    /**
     * Handles an XMLHttpRequest
     *
     * @this {IPhpDebugBarAjaxHandler}
     * @param {XMLHttpRequest} xhr
     * @return {Bool}
     */
    handle?: (xhr:XMLHttpRequest) => boolean;

    /**
     * Checks if the HEADER-id exists and loads the dataset using the open handler
     *
     * @param {XMLHttpRequest} xhr
     * @return {Bool}
     */
    loadFromId?: (xhr:XMLHttpRequest) => boolean;

    /**
     * Extracts the id from the HEADER-id
     *
     * @param {XMLHttpRequest} xhr
     * @return {String}
     */
    extractIdFromHeaders?: (xhr:XMLHttpRequest) => string;

    /**
     * Checks if the HEADER exists and loads the dataset
     *
     * @param {XMLHttpRequest} xhr
     * @return {Bool}
     */
    loadFromData?: (xhr:XMLHttpRequest) => boolean;

    /**
     * Extract the data as a string from headers of an XMLHttpRequest
     *
     * @this {IPhpDebugBarAjaxHandler}
     * @param {XMLHttpRequest} xhr
     * @return {string}
     */
    extractDataFromHeaders?: (xhr:XMLHttpRequest) => string;

    /**
     * Parses the string data into an object
     *
     * @this {IPhpDebugBarAjaxHandler}
     * @param {string} data
     * @return {string}
     */
    parseHeaders?: (data:string) => string;

    /**
     * Attaches an event listener to jQuery.ajaxComplete()
     *
     * @this {IPhpDebugBarAjaxHandler}
     * @param {jQuery} jq Optional
     */
    bindToJquery?: (jq:JQuery) => void;

    /**
     * Attaches an event listener to XMLHttpRequest
     *
     * @this {IPhpDebugBarAjaxHandler}
     */
    bindToXHR?: () => void;
}
interface IPhpDebugBarOpenHandler extends IPhpDebugBarWidget
{
    refresh ?: () => void;

    addSearch?: () => void;
    handleFind?: (data:any) => void;
    show?: (callback:any) => void;
    hide?: () => void;
    find?: (filters:any, offset:any, callback:any) => void;
    load?: (id:any, callback:any) => void;
    clear?: (callback:any) => void;
    ajax ?: (data:any, callback:any) => void;
}

interface IPhpDebugBarWidgets
{
    [key: string]: any
    ListWidget?:IPhpDebugBarWidget;
    CodexWidget?:any;
    KVListWidget?:IPhpDebugBarWidget;
    VariableListWidget?:IPhpDebugBarWidget;
    IFrameWidget?:IPhpDebugBarWidget;
    MessagesWidget?:IPhpDebugBarWidget;
    TimelineWidget?:IPhpDebugBarWidget;
    ExceptionsWidget?:IPhpDebugBarWidget;

    htmlize?:(text:string) =>string;
    renderValue?: (value:any, prettify?:boolean) => string;
    highlight?:(code:string, lang?:string)=>string;
    createCodeBlock?:(code:string, lang?:string)=>string;
}
interface IPhpDebugBarUtils
{
    getDictValue ?: (dict, key, default_value) => any;
    getObjectSize?:(obj:any)=>number;
    csscls?:(cls:string, prefix:string) => string;
    makecsscls?: (prefix:string) => (name:string) => string;
}


//declare var PhpDebugBar:IPhpDebugBar;

declare module phpDebugBar
{
    export class Widget implements IPhpDebugBarWidget
    {
        public static extend(props:any);
    }


    export class OpenHandler implements IPhpDebugBarOpenHandler
    {
    }
    export class AjaxHandler implements IPhpDebugBarAjaxHandler
    {
    }
}
interface IPhpDebugBar
{
    $?:JQueryStatic,
    Widgets?:IPhpDebugBarWidgets;
    Widget?:typeof phpDebugBar.Widget;
    utils?:IPhpDebugBarUtils;
    DebugBar?:IPhpDebugBarDebugBar;
    AjaxHandler:typeof phpDebugBar.AjaxHandler;
    OpenHandler:typeof phpDebugBar.OpenHandler;
}
declare var PhpDebugBar:IPhpDebugBar;
