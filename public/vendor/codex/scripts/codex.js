var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var codex;
(function (codex) {
    codex.defaultConfig = {
        apiUrl: 'http://codex-project.dev/api',
        debug: true
    };
    codex.pdata = {};
    if (window['_CODEX_PHP_DATA']) {
        codex.pdata = window['_CODEX_PHP_DATA'];
    }
    if (codex.pdata.defaultConfig) {
        codex.defaultConfig = _.merge(codex.defaultConfig, codex.pdata.defaultConfig);
    }
})(codex || (codex = {}));
var codex;
(function (codex) {
    var Api = (function () {
        function Api(url, wrappedEndpoint) {
            this.url = url;
            this.wrappedEndpoint = wrappedEndpoint;
        }
        Api.prototype.get = function (endpoint, data) {
            if (endpoint === void 0) { endpoint = ''; }
            if (data === void 0) { data = {}; }
            return this.ajax(endpoint, data);
        };
        Api.prototype.ajax = function (endpoint, data) {
            if (endpoint === void 0) { endpoint = ''; }
            if (data === void 0) { data = {}; }
            var defer = codex.util.create();
            $.ajax({
                url: this.endpoint(endpoint),
                data: data
            }).then(function (response) {
                codex.debug.log('Api response for endpoint', endpoint, 'response', response);
                if (response.success) {
                    defer.resolve(response);
                }
                else {
                    throw Error('Codex PHPDoc AJAX request failed: ' + response.message);
                }
            });
            return defer.promise;
        };
        Api.prototype.endpoint = function (endpoint) {
            var url = this.url + '/v' + Api.VERSION;
            if (codex.util.defined(this.wrappedEndpoint)) {
                url += '/' + this.wrappedEndpoint;
            }
            if (codex.util.defined(endpoint)) {
                url += '/' + endpoint;
            }
            return url;
        };
        Api.VERSION = '1';
        return Api;
    }());
    codex.Api = Api;
})(codex || (codex = {}));
var codex;
(function (codex) {
    var Loader = (function () {
        function Loader($el) {
            $el.data('loader', this);
            this.$el = $el;
            this.setLoader('rotating-plane');
        }
        Loader.prototype.createLoader = function () {
            this.$loader = $('<div>').prependTo(this.$el).hide();
            if (this.loader === 'rotating-plane') {
                this.$loader.addClass('sk-rotating-plane');
            }
            return this.$loader;
        };
        Loader.prototype.createHiddenContainer = function () {
            return this.$hiddenContainer = $('<div>').appendTo(this.$el.parent()).hide();
        };
        Loader.prototype.setLoader = function (name) {
            this.loader = name;
        };
        Loader.prototype.start = function () {
            this.$el.children().appendTo(this.createHiddenContainer());
            this.$el.append(this.createLoader().show());
        };
        Loader.prototype.stop = function () {
            this.$loader.remove();
            this.$hiddenContainer.children().appendTo(this.$el).remove();
        };
        return Loader;
    }());
    codex.Loader = Loader;
    function startLoader(el) {
        if (el instanceof jQuery) {
            el = jQuery(el);
        }
        var loader = getLoader(el);
        if (typeof loader === 'undefined') {
            loader = new Loader(el);
        }
        loader.start();
        return loader;
    }
    codex.startLoader = startLoader;
    function getLoader(el) {
        if (el instanceof jQuery) {
            el = jQuery(el);
        }
        return el.data('loader');
    }
    codex.getLoader = getLoader;
    function stopLoader(el) {
        var loader = getLoader(el);
        if (typeof loader !== 'undefined') {
            loader.stop();
        }
    }
    codex.stopLoader = stopLoader;
})(codex || (codex = {}));
var codex;
(function (codex) {
    var storage;
    (function (storage) {
        storage.bags = {};
        function hasBag(name) {
            return typeof storage.bags[name] !== 'undefined';
        }
        storage.hasBag = hasBag;
        function createBag(name, provider) {
            if (hasBag(name)) {
                throw new Error('StorageBag ' + name + ' already exists');
            }
            return storage.bags[name] = new StorageBag(provider);
        }
        storage.createBag = createBag;
        function getBag(name) {
            if (!hasBag(name)) {
                throw new Error('StorageBag ' + name + ' does not exist');
            }
            return storage.bags[name];
        }
        storage.getBag = getBag;
        var StorageBag = (function () {
            function StorageBag(provider) {
                this.provider = provider;
            }
            StorageBag.prototype.on = function (callback) {
                this.provider.onStoreEvent(callback);
            };
            StorageBag.prototype.set = function (key, val, options) {
                var options = _.merge({ json: false, expires: false }, options);
                if (options.json) {
                    val = JSON.stringify(val);
                }
                if (options.expires) {
                    var now = Math.floor((Date.now() / 1000) / 60);
                    this.provider.setItem(key + ':expire', now + options.expires);
                }
                this.provider.setItem(key, val);
            };
            StorageBag.prototype.get = function (key, options) {
                var options = _.merge({ json: false, def: null }, options);
                if (!codex.util.defined(key)) {
                    return options.def;
                }
                if (_.isString(this.provider.getItem(key))) {
                    if (_.isString(this.provider.getItem(key + ':expire'))) {
                        var now = Math.floor((Date.now() / 1000) / 60);
                        var expires = parseInt(this.provider.getItem(key + ':expire'));
                        if (now > expires) {
                            this.del(key);
                            this.del(key + ':expire');
                        }
                    }
                }
                var val = this.provider.getItem(key);
                if (!codex.util.defined(val) || codex.util.defined(val) && val == null) {
                    return options.def;
                }
                if (options.json) {
                    return JSON.parse(val);
                }
                return val;
            };
            StorageBag.prototype.del = function (key) {
                this.provider.removeItem(key);
            };
            StorageBag.prototype.clear = function () {
                this.provider.clear();
            };
            StorageBag.prototype.getSize = function (key) {
                return this.provider.getSize(key);
            };
            return StorageBag;
        }());
        storage.StorageBag = StorageBag;
        var LocalStorage = (function () {
            function LocalStorage() {
            }
            Object.defineProperty(LocalStorage.prototype, "length", {
                get: function () {
                    return window.localStorage.length;
                },
                enumerable: true,
                configurable: true
            });
            LocalStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.localStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.localStorage) {
                        total += (window.localStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            LocalStorage.prototype.onStoreEvent = function (callback) {
                if (window.addEventListener) {
                    window.addEventListener("storage", callback, false);
                }
                else {
                    window.attachEvent("onstorage", callback);
                }
            };
            LocalStorage.prototype.clear = function () {
                window.localStorage.clear();
            };
            LocalStorage.prototype.getItem = function (key) {
                return window.localStorage.getItem(key);
            };
            LocalStorage.prototype.key = function (index) {
                return window.localStorage.key(index);
            };
            LocalStorage.prototype.removeItem = function (key) {
                window.localStorage.removeItem(key);
            };
            LocalStorage.prototype.setItem = function (key, data) {
                window.localStorage.setItem(key, data);
            };
            return LocalStorage;
        }());
        storage.LocalStorage = LocalStorage;
        var SessionStorage = (function () {
            function SessionStorage() {
            }
            Object.defineProperty(SessionStorage.prototype, "length", {
                get: function () {
                    return window.sessionStorage.length;
                },
                enumerable: true,
                configurable: true
            });
            SessionStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.sessionStorage) {
                        total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            SessionStorage.prototype.onStoreEvent = function (callback) {
                if (window.addEventListener) {
                    window.addEventListener("storage", callback, false);
                }
                else {
                    window.attachEvent("onstorage", callback);
                }
            };
            SessionStorage.prototype.clear = function () {
                window.sessionStorage.clear();
            };
            SessionStorage.prototype.getItem = function (key) {
                return window.sessionStorage.getItem(key);
            };
            SessionStorage.prototype.key = function (index) {
                return window.sessionStorage.key(index);
            };
            SessionStorage.prototype.removeItem = function (key) {
                window.sessionStorage.removeItem(key);
            };
            SessionStorage.prototype.setItem = function (key, data) {
                window.sessionStorage.setItem(key, data);
            };
            return SessionStorage;
        }());
        storage.SessionStorage = SessionStorage;
        var CookieStorage = (function () {
            function CookieStorage() {
                this.cookieRegistry = [];
            }
            Object.defineProperty(CookieStorage.prototype, "length", {
                get: function () {
                    return this.keys().length;
                },
                enumerable: true,
                configurable: true
            });
            CookieStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.sessionStorage) {
                        total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            CookieStorage.prototype.listenCookieChange = function (cookieName, callback) {
                var _this = this;
                setInterval(function () {
                    if (_this.hasItem(cookieName)) {
                        if (_this.getItem(cookieName) != _this.cookieRegistry[cookieName]) {
                            _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                            return callback();
                        }
                    }
                    else {
                        _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                    }
                }, 100);
            };
            CookieStorage.prototype.onStoreEvent = function (callback) {
                var _this = this;
                this.keys().forEach(function (name) {
                    _this.listenCookieChange(name, callback);
                });
            };
            CookieStorage.prototype.clear = function () {
                var _this = this;
                this.keys().forEach(function (name) {
                    _this.removeItem(name);
                });
            };
            CookieStorage.prototype.key = function (index) {
                return this.keys()[index];
            };
            CookieStorage.prototype.getItem = function (sKey) {
                if (!sKey) {
                    return null;
                }
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            };
            CookieStorage.prototype.setItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return;
                }
                var sExpires = "";
                if (vEnd) {
                    switch (vEnd.constructor) {
                        case Number:
                            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                            break;
                        case String:
                            sExpires = "; expires=" + vEnd;
                            break;
                        case Date:
                            sExpires = "; expires=" + vEnd.toUTCString();
                            break;
                    }
                }
                document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                return;
            };
            CookieStorage.prototype.removeItem = function (key, sPath, sDomain) {
                if (!this.hasItem(key)) {
                    return false;
                }
                document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                return true;
            };
            CookieStorage.prototype.hasItem = function (sKey) {
                if (!sKey) {
                    return false;
                }
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            };
            CookieStorage.prototype.keys = function () {
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                }
                return aKeys;
            };
            return CookieStorage;
        }());
        storage.CookieStorage = CookieStorage;
        if (typeof window.localStorage !== 'undefined') {
            createBag('local', new LocalStorage());
        }
        if (typeof window.sessionStorage !== 'undefined') {
            createBag('session', new SessionStorage());
        }
        if (typeof window.document.cookie !== 'undefined') {
            createBag('cookie', new CookieStorage());
        }
    })(storage = codex.storage || (codex.storage = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        var old_json = JSON;
        function stringify(obj) {
            return old_json.stringify(obj, function (key, value) {
                if (value instanceof Function || typeof value == 'function') {
                    return value.toString();
                }
                if (value instanceof RegExp) {
                    return '_PxEgEr_' + value;
                }
                return value;
            });
        }
        util.stringify = stringify;
        function parse(str, date2obj) {
            var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
            return old_json.parse(str, function (key, value) {
                var prefix;
                if (typeof value != 'string') {
                    return value;
                }
                if (value.length < 8) {
                    return value;
                }
                prefix = value.substring(0, 8);
                if (iso8061 && value.match(iso8061)) {
                    return new Date(value);
                }
                if (prefix === 'function') {
                    return eval('(' + value + ')');
                }
                if (prefix === '_PxEgEr_') {
                    return eval(value.slice(8));
                }
                return value;
            });
        }
        util.parse = parse;
        function clone(obj, date2obj) {
            return parse(stringify(obj), date2obj);
        }
        util.clone = clone;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        util.openWindowDefaults = {
            width: 600,
            height: 600
        };
        function openWindow(opts) {
            if (opts === void 0) { opts = {}; }
            opts = _.merge(util.openWindowDefaults, opts);
            var win = window.open('', '', 'width=' + opts.width + ', height=' + opts.height);
            if (util.defined(opts.content)) {
                win.document.body.innerHTML = opts.content;
            }
            return win;
        }
        util.openWindow = openWindow;
        function cre(name) {
            if (!util.defined(name)) {
                name = 'div';
            }
            return $(document.createElement(name));
        }
        util.cre = cre;
        function getViewPort() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        }
        util.getViewPort = getViewPort;
        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                return true;
            }
            catch (e) {
                return false;
            }
        }
        util.isTouchDevice = isTouchDevice;
        function registerJQueryHelpers() {
            if (util.kindOf($.fn.prefixedData) === 'function') {
                return;
            }
            $.fn.prefixedData = function (prefix) {
                var origData = $(this).first().data();
                var data = {};
                for (var p in origData) {
                    var pattern = new RegExp("^" + prefix + "[A-Z]+");
                    if (origData.hasOwnProperty(p) && pattern.test(p)) {
                        var shortName = p[prefix.length].toLowerCase() + p.substr(prefix.length + 1);
                        data[shortName] = origData[p];
                    }
                }
                return data;
            };
            $.fn.removeAttributes = function () {
                return this.each(function () {
                    var attributes = $.map(this.attributes, function (item) {
                        return item.name;
                    });
                    var img = $(this);
                    $.each(attributes, function (i, item) {
                        img.removeAttr(item);
                    });
                });
            };
            $.fn.ensureClass = function (clas, has) {
                if (has === void 0) { has = true; }
                var $this = $(this);
                if (has === true && $this.hasClass(clas) === false) {
                    $this.addClass(clas);
                }
                else if (has === false && $this.hasClass(clas) === true) {
                    $this.removeClass(clas);
                }
                return this;
            };
            $.fn.onClick = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var $this = $(this);
                return $this.on.apply($this, [isTouchDevice() ? 'touchend' : 'click'].concat(args));
            };
        }
        util.registerJQueryHelpers = registerJQueryHelpers;
        var BrowserPrettyConsole = (function () {
            function BrowserPrettyConsole(printFn) {
                this.matcher = /\[style\=([\w\d\_\-\,]*?)\](.*?)\[style\]/g;
                this.macros = {};
                this.styles = {};
                this.printFn = printFn || console.log;
            }
            BrowserPrettyConsole.prototype.addMaterialStyle = function (name, variant) {
                if (variant === void 0) { variant = '500'; }
                if (typeof name === 'string') {
                    if (variant !== '500') {
                        name += variant.toString();
                    }
                    this.styles[name.toString()] = 'color: ' + util.color(name.toString(), variant);
                }
                else {
                    name.forEach(function (n) {
                        this.addMaterialStyle(n, variant);
                    }.bind(this));
                }
                return this;
            };
            BrowserPrettyConsole.prototype.addFontStyle = function (name, ff) {
                this.styles[name] = 'font-family: ' + ff;
                return this;
            };
            BrowserPrettyConsole.prototype.addStyle = function (name, val) {
                if (typeof val === 'string') {
                    this.styles[name] = val;
                }
                else {
                    var css = '';
                    val.forEach(function (v) {
                        if (typeof this.styles[v] === 'string') {
                            css += this.styles[v] + ';';
                        }
                        else {
                            css += v + ';';
                        }
                    }.bind(this));
                    this.styles[name] = css;
                }
                return this;
            };
            BrowserPrettyConsole.prototype.allStyles = function () {
                return this.styles;
            };
            BrowserPrettyConsole.prototype.getStyle = function (name) {
                return this.styles[name];
            };
            BrowserPrettyConsole.prototype.hasStyle = function (name) {
                return util.defined(this.styles[name]);
            };
            BrowserPrettyConsole.prototype.addDefaults = function () {
                for (var i = 8; i < 30; i++) {
                    this.addStyle('fs' + i.toString(), 'font-size: ' + i.toString() + 'px');
                }
                this.addStyle('bold', 'font-weight:bold')
                    .addStyle('code-box', 'background: #37474F; padding: 1px 5px; border: 1px solid rgba(#373a3c, 0.1); line-height: 18px')
                    .addMaterialStyle(Object.keys(util.colors))
                    .addFontStyle('code', '"Source Code Pro", "Courier New", Courier, monospace')
                    .addFontStyle('arial', 'Arial, Helvetica, sans-serif')
                    .addFontStyle('verdana', 'Verdana, Geneva, sans-serif')
                    .addStyle('codex-orange', 'color:#ed6626;');
                this.createMacro('title', function (title) {
                    this.write('[style=block,bold,fs20,code,codex-orange]' + title + '[style]');
                });
                this.createMacro('alert', function (text) {
                    this.write('[style=code-box,code,red]' + text + '[style]');
                });
            };
            BrowserPrettyConsole.prototype.createMacro = function (name, fn) {
                this.macros[name] = fn;
            };
            BrowserPrettyConsole.prototype.macro = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var name = args.shift();
                if (!util.defined(this.macros[name])) {
                    console.warn('cannot do macro', name);
                    return;
                }
                this.macros[name].apply(this, args);
            };
            BrowserPrettyConsole.prototype.write = function (message) {
                var _this = this;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var applyArgs = [];
                applyArgs.push(message.replace(this.matcher, '%c$2%c'));
                var matched;
                while ((matched = this.matcher.exec(message)) !== null) {
                    var css = '';
                    matched[1].split(',').forEach(function (style) {
                        css += _this.getStyle(style) + ';';
                    });
                    applyArgs.push(css);
                    applyArgs.push('');
                }
                this.printFn.apply(console, applyArgs.concat(args));
            };
            return BrowserPrettyConsole;
        }());
        util.BrowserPrettyConsole = BrowserPrettyConsole;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        var Config = (function () {
            function Config(obj, storageBag) {
                this.allDelimiters = {};
                this.addDelimiters('config', '<%', '%>');
                this.data = obj || {};
            }
            Config.prototype.unset = function (prop) {
                prop = prop.split('.');
                var key = prop.pop();
                var obj = util.objectGet(this.data, Config.getPropString(prop.join('.')));
                delete obj[key];
            };
            Config.prototype.has = function (prop) {
                return util.objectExists(this.data, Config.getPropString(prop));
            };
            Config.prototype.raw = function (prop) {
                if (prop) {
                    return util.objectGet(this.data, Config.getPropString(prop));
                }
                else {
                    return this.data;
                }
            };
            Config.prototype.get = function (prop) {
                return this.process(this.raw(prop));
            };
            Config.prototype.set = function (prop, value) {
                util.objectSet(this.data, Config.getPropString(prop), value);
                return this;
            };
            Config.prototype.merge = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length === 1) {
                    this.data = _.merge(this.data, args[0]);
                }
                else {
                    var prop = args[0];
                    this.set(prop, _.merge(this.raw(prop), args[1]));
                }
                return this;
            };
            Config.prototype.process = function (raw) {
                var self = this;
                return util.recurse(raw, function (value) {
                    if (typeof value !== 'string') {
                        return value;
                    }
                    var matches = value.match(Config.propStringTmplRe);
                    var result;
                    if (matches) {
                        result = self.get(matches[1]);
                        if (result != null) {
                            return result;
                        }
                    }
                    return self.processTemplate(value, { data: self.data });
                });
            };
            Config.prototype.addDelimiters = function (name, opener, closer) {
                var delimiters = this.allDelimiters[name] = {};
                delimiters.opener = opener;
                delimiters.closer = closer;
                var a = delimiters.opener.replace(/(.)/g, '\\$1');
                var b = '([\\s\\S]+?)' + delimiters.closer.replace(/(.)/g, '\\$1');
                delimiters.lodash = {
                    evaluate: new RegExp(a + b, 'g'),
                    interpolate: new RegExp(a + '=' + b, 'g'),
                    escape: new RegExp(a + '-' + b, 'g')
                };
            };
            Config.prototype.setDelimiters = function (name) {
                var delimiters = this.allDelimiters[name in this.allDelimiters ? name : 'config'];
                _.templateSettings = delimiters.lodash;
                return delimiters;
            };
            Config.prototype.processTemplate = function (tmpl, options) {
                if (!options) {
                    options = {};
                }
                var delimiters = this.setDelimiters(options.delimiters);
                var data = Object.create(options.data || this.data || {});
                var last = tmpl;
                try {
                    while (tmpl.indexOf(delimiters.opener) >= 0) {
                        tmpl = _.template(tmpl)(data);
                        if (tmpl === last) {
                            break;
                        }
                        last = tmpl;
                    }
                }
                catch (e) {
                }
                return tmpl.toString().replace(/\r\n|\n/g, '\n');
            };
            Config.makeProperty = function (config) {
                var cf = function (prop) {
                    return config.get(prop);
                };
                cf.get = config.get.bind(config);
                cf.set = config.set.bind(config);
                cf.unset = config.unset.bind(config);
                cf.merge = config.merge.bind(config);
                cf.raw = config.raw.bind(config);
                cf.process = config.process.bind(config);
                cf.has = config.has.bind(config);
                return cf;
            };
            Config.getPropString = function (prop) {
                return Array.isArray(prop) ? prop.map(this.escape).join('.') : prop;
            };
            Config.escape = function (str) {
                return str.replace(/\./g, '\\.');
            };
            Config.prototype.toString = function () {
                return this.raw();
            };
            Config.propStringTmplRe = /^<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>$/i;
            return Config;
        }());
        util.Config = Config;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        var StyleStuff = (function () {
            function StyleStuff() {
                this._styles = {};
            }
            StyleStuff.prototype.addMSC = function (name, variant) {
                if (variant === void 0) { variant = '500'; }
                if (typeof name === 'string') {
                    if (variant !== '500') {
                        name += variant.toString();
                    }
                    this._styles[name.toString()] = 'color: ' + util.color(name.toString(), variant);
                }
                else {
                    name.forEach(function (n) {
                        this.addMSC(n, variant);
                    }.bind(this));
                }
                return this;
            };
            StyleStuff.prototype.addFont = function (name, ff) {
                this._styles[name] = 'font-family: ' + ff;
                return this;
            };
            StyleStuff.prototype.add = function (name, val) {
                if (typeof val === 'string') {
                    this._styles[name] = val;
                }
                else {
                    var css = '';
                    val.forEach(function (v) {
                        if (typeof this._styles[v] === 'string') {
                            css += this._styles[v] + ';';
                        }
                        else {
                            css += v + ';';
                        }
                    }.bind(this));
                    this._styles[name] = css;
                }
                return this;
            };
            StyleStuff.prototype.all = function () {
                return this._styles;
            };
            StyleStuff.prototype.get = function (name) {
                return this._styles[name];
            };
            StyleStuff.prototype.has = function (name) {
                return typeof this._styles[name] === 'string';
            };
            return StyleStuff;
        }());
        util.StyleStuff = StyleStuff;
        var Debug = (function () {
            function Debug(title) {
                this.matcher = /\[style\=([\w\d\_\-\,]*?)\](.*?)\[style\]/g;
                this.title = title;
                this.start = new Date;
                this.styles = new StyleStuff();
                this.enabled = false;
                this.colors = util.colors;
                for (var i = 8; i < 30; i++) {
                    this.styles.add('fs' + i.toString(), 'font-size: ' + i.toString() + 'px');
                }
                this.styles
                    .add('bold', 'font-weight:bold')
                    .add('code-box', 'background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1); line-height: 18px')
                    .addMSC(Object.keys(util.colors))
                    .addFont('code', '"Source Code Pro", "Courier New", Courier, monospace')
                    .addFont('arial', 'Arial, Helvetica, sans-serif')
                    .addFont('verdana', 'Verdana, Geneva, sans-serif');
            }
            Debug.prototype.printTitle = function () {
                this.out('[style=orange,fs25]' + this.title + '[style] [style=yellow]1.0.0[style]');
            };
            Debug.prototype.log = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var elapsedTime = Date.now() - this.start.getTime();
                if (elapsedTime > 1) {
                    elapsedTime = util.round(elapsedTime / 1000, 2);
                }
                this.out.apply(this, ['[style=orange,fs10]DEBUG[style]([style=green,fs8]' + elapsedTime + '[style]): '].concat(args));
            };
            Debug.prototype.profile = function (msg) {
                if (this.enabled !== true) {
                    return;
                }
                this.log(msg);
                console.profile(msg);
            };
            Debug.prototype.profileEnd = function () {
                console.profileEnd();
            };
            Debug.prototype.logEvent = function (eventName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var elapsedTime = Date.now() - this.start.getTime();
                if (elapsedTime > 1) {
                    elapsedTime = util.round(elapsedTime / 1000, 2);
                }
                this.out.apply(this, ['[style=orange,fs10]DEBUG[style]([style=green,fs8]' + elapsedTime + '[style]):[style=teal,fs10]EVENT[style]([style=blue,fs8]' + eventName + '[style]): '].concat(args));
            };
            Debug.prototype.out = function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this.enabled !== true) {
                    return;
                }
                var self = this;
                var applyArgs = [];
                applyArgs.push(message.replace(this.matcher, '%c$2%c'));
                var matched;
                while ((matched = this.matcher.exec(message)) !== null) {
                    var css = '';
                    matched[1].split(',').forEach(function (style) {
                        css += self.styles.get(style) + ';';
                    });
                    applyArgs.push(css);
                    applyArgs.push('');
                }
                console.log.apply(console, applyArgs.concat(args));
            };
            Debug.prototype.enable = function () {
                if (this.enabled) {
                    return;
                }
                this.enabled = true;
                this.printTitle();
            };
            Debug.prototype.isEnabled = function () {
                return this.enabled;
            };
            Debug.prototype.setStartDate = function (start) {
                this.start = start;
                return this;
            };
            return Debug;
        }());
        util.Debug = Debug;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        util.defaultEE2Options = {
            wildcard: true,
            delimiter: ':',
            newListener: true,
            maxListeners: 50
        };
        var EventEmitter = (function (_super) {
            __extends(EventEmitter, _super);
            function EventEmitter(eventOptions) {
                if (eventOptions === void 0) { eventOptions = {}; }
                _super.call(this, _.merge(util.defaultEE2Options, eventOptions));
            }
            return EventEmitter;
        }(EventEmitter2));
        util.EventEmitter = EventEmitter;
        util.EventListener = {
            listen: function (target, eventType, callback) {
                if (target.addEventListener) {
                    target.addEventListener(eventType, callback, false);
                    return {
                        remove: function () {
                            target.removeEventListener(eventType, callback, false);
                        }
                    };
                }
                else if (target.attachEvent) {
                    target.attachEvent('on' + eventType, callback);
                    return {
                        remove: function () {
                            target.detachEvent('on' + eventType, callback);
                        }
                    };
                }
            }
        };
        function assign(obj, methodName, c) {
            var assignToProperty = c.assignToProperty, fnCustomReturn = c.fnCustomReturn;
            return function () {
                obj[assignToProperty][methodName].apply(obj[assignToProperty], _.toArray(arguments));
                if (!_.isNull(fnCustomReturn)) {
                    return fnCustomReturn;
                }
            };
        }
        function makeEventEmitter(obj, options) {
            if (options === void 0) { options = {}; }
            var c = _.merge({
                assignMethods: ['on', 'once', 'off'],
                assignPrivateMethods: ['emit'],
                assignToProperty: '_events',
                privateMethodPrefix: '_',
                assignByAliases: false,
                aliases: {
                    on: ['onEvent', 'addListener']
                },
                eventClass: EventEmitter2,
                eventClassOptions: util.defaultEE2Options,
                assignToPrototype: false,
                fnCustomReturn: null,
                debug: false
            }, options);
            if (c.assignToPrototype === false) {
                if (_.isNull(c.eventClassOptions)) {
                    obj[c.assignToProperty] = new c['eventClass']();
                }
                else {
                    obj[c.assignToProperty] = new c['eventClass'](c.eventClassOptions);
                }
            }
            else {
                throw new Error('assignToPrototype not implemented yet');
            }
            if (c.assignByAliases) {
                _.each(c.aliases, function (aliases, methodName) {
                    if (_.isString(aliases)) {
                        aliases = [aliases];
                    }
                    aliases.forEach(function (methodAssignmentName) {
                        obj[methodAssignmentName] = assign(obj, methodName, c);
                    });
                });
            }
            else {
                ['assignMethods', 'assignPrivateMethods'].forEach(function (methodType) {
                    c[methodType].forEach(function (methodName) {
                        if (methodType === 'assignPrivateMethods' && c.assignToPrototype === true) {
                            return;
                        }
                        if (_.isString(c.aliases[methodName])) {
                            c.aliases[methodName] = [c.aliases[methodName]];
                        }
                        if (!_.isArray(c.aliases[methodName])) {
                            c.aliases[methodName] = [methodName];
                        }
                        else {
                            c.aliases[methodName].push(methodName);
                        }
                        c.aliases[methodName].forEach(function (methodAssignmentName) {
                            if (methodType === 'assignPrivateMethods') {
                                methodAssignmentName = c.privateMethodPrefix + methodAssignmentName;
                            }
                            obj[methodAssignmentName] = assign(obj, methodName, c);
                        });
                    });
                });
            }
            return obj;
        }
        util.makeEventEmitter = makeEventEmitter;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        function round(value, places) {
            var multiplier = Math.pow(10, places);
            return (Math.round(value * multiplier) / multiplier);
        }
        util.round = round;
        function makeString(object) {
            if (object == null)
                return '';
            return '' + object;
        }
        util.makeString = makeString;
        function defaultToWhiteSpace(characters) {
            if (characters == null)
                return '\\s';
            else if (characters.source)
                return characters.source;
            else
                return '[' + _.escapeRegExp(characters) + ']';
        }
        util.defaultToWhiteSpace = defaultToWhiteSpace;
        var kindsOf = {};
        'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
            kindsOf['[object ' + k + ']'] = k.toLowerCase();
        });
        var nativeTrim = String.prototype.trim;
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        function kindOf(value) {
            if (value == null) {
                return String(value);
            }
            return kindsOf[kindsOf.toString.call(value)] || 'object';
        }
        util.kindOf = kindOf;
        function def(val, def) {
            return defined(val) ? val : def;
        }
        util.def = def;
        function defined(obj) {
            return !_.isUndefined(obj);
        }
        util.defined = defined;
        function getRandomId(length) {
            if (!_.isNumber(length)) {
                length = 15;
            }
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        util.getRandomId = getRandomId;
        function getTemplate(name) {
            if (!defined(window['JST'][name])) {
                throw new Error('Template [' + name + '] not found');
            }
            return window['JST'][name];
        }
        util.getTemplate = getTemplate;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        var materialColors = {
            'red': {
                '50': '#ffebee',
                '100': '#ffcdd2',
                '200': '#ef9a9a',
                '300': '#e57373',
                '400': '#ef5350',
                '500': '#f44336',
                '600': '#e53935',
                '700': '#d32f2f',
                '800': '#c62828',
                '900': '#b71c1c',
                'a100': '#ff8a80',
                'a200': '#ff5252',
                'a400': '#ff1744',
                'a700': '#d50000',
            },
            'pink': {
                '50': '#fce4ec',
                '100': '#f8bbd0',
                '200': '#f48fb1',
                '300': '#f06292',
                '400': '#ec407a',
                '500': '#e91e63',
                '600': '#d81b60',
                '700': '#c2185b',
                '800': '#ad1457',
                '900': '#880e4f',
                'a100': '#ff80ab',
                'a200': '#ff4081',
                'a400': '#f50057',
                'a700': '#c51162',
            },
            'purple': {
                '50': '#f3e5f5',
                '100': '#e1bee7',
                '200': '#ce93d8',
                '300': '#ba68c8',
                '400': '#ab47bc',
                '500': '#9c27b0',
                '600': '#8e24aa',
                '700': '#7b1fa2',
                '800': '#6a1b9a',
                '900': '#4a148c',
                'a100': '#ea80fc',
                'a200': '#e040fb',
                'a400': '#d500f9',
                'a700': '#aa00ff',
            },
            'deep-purple': {
                '50': '#ede7f6',
                '100': '#d1c4e9',
                '200': '#b39ddb',
                '300': '#9575cd',
                '400': '#7e57c2',
                '500': '#673ab7',
                '600': '#5e35b1',
                '700': '#512da8',
                '800': '#4527a0',
                '900': '#311b92',
                'a100': '#b388ff',
                'a200': '#7c4dff',
                'a400': '#651fff',
                'a700': '#6200ea',
            },
            'indigo': {
                '50': '#e8eaf6',
                '100': '#c5cae9',
                '200': '#9fa8da',
                '300': '#7986cb',
                '400': '#5c6bc0',
                '500': '#3f51b5',
                '600': '#3949ab',
                '700': '#303f9f',
                '800': '#283593',
                '900': '#1a237e',
                'a100': '#8c9eff',
                'a200': '#536dfe',
                'a400': '#3d5afe',
                'a700': '#304ffe',
            },
            'blue': {
                '50': '#e3f2fd',
                '100': '#bbdefb',
                '200': '#90caf9',
                '300': '#64b5f6',
                '400': '#42a5f5',
                '500': '#2196f3',
                '600': '#1e88e5',
                '700': '#1976d2',
                '800': '#1565c0',
                '900': '#0d47a1',
                'a100': '#82b1ff',
                'a200': '#448aff',
                'a400': '#2979ff',
                'a700': '#2962ff',
            },
            'light-blue': {
                '50': '#e1f5fe',
                '100': '#b3e5fc',
                '200': '#81d4fa',
                '300': '#4fc3f7',
                '400': '#29b6f6',
                '500': '#03a9f4',
                '600': '#039be5',
                '700': '#0288d1',
                '800': '#0277bd',
                '900': '#01579b',
                'a100': '#80d8ff',
                'a200': '#40c4ff',
                'a400': '#00b0ff',
                'a700': '#0091ea',
            },
            'cyan': {
                '50': '#e0f7fa',
                '100': '#b2ebf2',
                '200': '#80deea',
                '300': '#4dd0e1',
                '400': '#26c6da',
                '500': '#00bcd4',
                '600': '#00acc1',
                '700': '#0097a7',
                '800': '#00838f',
                '900': '#006064',
                'a100': '#84ffff',
                'a200': '#18ffff',
                'a400': '#00e5ff',
                'a700': '#00b8d4',
            },
            'teal': {
                '50': '#e0f2f1',
                '100': '#b2dfdb',
                '200': '#80cbc4',
                '300': '#4db6ac',
                '400': '#26a69a',
                '500': '#009688',
                '600': '#00897b',
                '700': '#00796b',
                '800': '#00695c',
                '900': '#004d40',
                'a100': '#a7ffeb',
                'a200': '#64ffda',
                'a400': '#1de9b6',
                'a700': '#00bfa5',
            },
            'green': {
                '50': '#e8f5e9',
                '100': '#c8e6c9',
                '200': '#a5d6a7',
                '300': '#81c784',
                '400': '#66bb6a',
                '500': '#4caf50',
                '600': '#43a047',
                '700': '#388e3c',
                '800': '#2e7d32',
                '900': '#1b5e20',
                'a100': '#b9f6ca',
                'a200': '#69f0ae',
                'a400': '#00e676',
                'a700': '#00c853',
            },
            'light-green': {
                '50': '#f1f8e9',
                '100': '#dcedc8',
                '200': '#c5e1a5',
                '300': '#aed581',
                '400': '#9ccc65',
                '500': '#8bc34a',
                '600': '#7cb342',
                '700': '#689f38',
                '800': '#558b2f',
                '900': '#33691e',
                'a100': '#ccff90',
                'a200': '#b2ff59',
                'a400': '#76ff03',
                'a700': '#64dd17',
            },
            'lime': {
                '50': '#f9fbe7',
                '100': '#f0f4c3',
                '200': '#e6ee9c',
                '300': '#dce775',
                '400': '#d4e157',
                '500': '#cddc39',
                '600': '#c0ca33',
                '700': '#afb42b',
                '800': '#9e9d24',
                '900': '#827717',
                'a100': '#f4ff81',
                'a200': '#eeff41',
                'a400': '#c6ff00',
                'a700': '#aeea00',
            },
            'yellow': {
                '50': '#fffde7',
                '100': '#fff9c4',
                '200': '#fff59d',
                '300': '#fff176',
                '400': '#ffee58',
                '500': '#ffeb3b',
                '600': '#fdd835',
                '700': '#fbc02d',
                '800': '#f9a825',
                '900': '#f57f17',
                'a100': '#ffff8d',
                'a200': '#ffff00',
                'a400': '#ffea00',
                'a700': '#ffd600',
            },
            'amber': {
                '50': '#fff8e1',
                '100': '#ffecb3',
                '200': '#ffe082',
                '300': '#ffd54f',
                '400': '#ffca28',
                '500': '#ffc107',
                '600': '#ffb300',
                '700': '#ffa000',
                '800': '#ff8f00',
                '900': '#ff6f00',
                'a100': '#ffe57f',
                'a200': '#ffd740',
                'a400': '#ffc400',
                'a700': '#ffab00',
            },
            'orange': {
                '50': '#fff3e0',
                '100': '#ffe0b2',
                '200': '#ffcc80',
                '300': '#ffb74d',
                '400': '#ffa726',
                '500': '#ff9800',
                '600': '#fb8c00',
                '700': '#f57c00',
                '800': '#ef6c00',
                '900': '#e65100',
                'a100': '#ffd180',
                'a200': '#ffab40',
                'a400': '#ff9100',
                'a700': '#ff6d00',
            },
            'deep-orange': {
                '50': '#fbe9e7',
                '100': '#ffccbc',
                '200': '#ffab91',
                '300': '#ff8a65',
                '400': '#ff7043',
                '500': '#ff5722',
                '600': '#f4511e',
                '700': '#e64a19',
                '800': '#d84315',
                '900': '#bf360c',
                'a100': '#ff9e80',
                'a200': '#ff6e40',
                'a400': '#ff3d00',
                'a700': '#dd2c00',
            },
            'brown': {
                '50': '#efebe9',
                '100': '#d7ccc8',
                '200': '#bcaaa4',
                '300': '#a1887f',
                '400': '#8d6e63',
                '500': '#795548',
                '600': '#6d4c41',
                '700': '#5d4037',
                '800': '#4e342e',
                '900': '#3e2723',
            },
            'grey': {
                '50': '#fafafa',
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
            },
            'blue-grey': {
                '50': '#eceff1',
                '100': '#cfd8dc',
                '200': '#b0bec5',
                '300': '#90a4ae',
                '400': '#78909c',
                '500': '#607d8b',
                '600': '#546e7a',
                '700': '#455a64',
                '800': '#37474f',
                '900': '#263238',
                '1000': '#11171a',
            }
        };
        util.colors = materialColors;
        function color(name, variant, prefixHexSymbol) {
            if (variant === void 0) { variant = '500'; }
            if (prefixHexSymbol === void 0) { prefixHexSymbol = true; }
            if (typeof util.colors[name] === 'object' && typeof util.colors[name][variant] === 'string') {
                return prefixHexSymbol ? util.colors[name][variant] : util.colors[name][variant].replace('#', '');
            }
            throw new Error('Could not find color [' + name + '] variant [' + variant + '] in materials.color()');
        }
        util.color = color;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        function getParts(str) {
            return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
                return s.replace(/\uffff/g, '.');
            });
        }
        util.getParts = getParts;
        function objectGet(obj, parts, create) {
            if (typeof parts === 'string') {
                parts = getParts(parts);
            }
            var part;
            while (typeof obj === 'object' && obj && parts.length) {
                part = parts.shift();
                if (!(part in obj) && create) {
                    obj[part] = {};
                }
                obj = obj[part];
            }
            return obj;
        }
        util.objectGet = objectGet;
        function objectSet(obj, parts, value) {
            parts = getParts(parts);
            var prop = parts.pop();
            obj = objectGet(obj, parts, true);
            if (obj && typeof obj === 'object') {
                return (obj[prop] = value);
            }
        }
        util.objectSet = objectSet;
        function objectExists(obj, parts) {
            parts = getParts(parts);
            var prop = parts.pop();
            obj = objectGet(obj, parts);
            return typeof obj === 'object' && obj && prop in obj;
        }
        util.objectExists = objectExists;
        function recurse(value, fn, fnContinue) {
            function recurse(value, fn, fnContinue, state) {
                var error;
                if (state.objs.indexOf(value) !== -1) {
                    error = new Error('Circular reference detected (' + state.path + ')');
                    error.path = state.path;
                    throw error;
                }
                var obj, key;
                if (fnContinue && fnContinue(value) === false) {
                    return value;
                }
                else if (util.kindOf(value) === 'array') {
                    return value.map(function (item, index) {
                        return recurse(item, fn, fnContinue, {
                            objs: state.objs.concat([value]),
                            path: state.path + '[' + index + ']',
                        });
                    });
                }
                else if (util.kindOf(value) === 'object') {
                    obj = {};
                    for (key in value) {
                        obj[key] = recurse(value[key], fn, fnContinue, {
                            objs: state.objs.concat([value]),
                            path: state.path + (/\W/.test(key) ? '["' + key + '"]' : '.' + key),
                        });
                    }
                    return obj;
                }
                else {
                    return fn(value);
                }
            }
            return recurse(value, fn, fnContinue, { objs: [], path: '' });
        }
        util.recurse = recurse;
        function copyObject(object) {
            var objectCopy = {};
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    objectCopy[key] = object[key];
                }
            }
            return objectCopy;
        }
        util.copyObject = copyObject;
        function dotize(obj, prefix) {
            if (!obj || typeof obj != "object") {
                if (prefix) {
                    var newObj = {};
                    newObj[prefix] = obj;
                    return newObj;
                }
                else
                    return obj;
            }
            var newObj = {};
            function recurse(o, p, isArrayItem) {
                for (var f in o) {
                    if (o[f] && typeof o[f] === "object") {
                        if (Array.isArray(o[f]))
                            newObj = recurse(o[f], (p ? p : "") + (isNumber(f) ? "[" + f + "]" : "." + f), true);
                        else {
                            if (isArrayItem)
                                newObj = recurse(o[f], (p ? p : "") + "[" + f + "]");
                            else
                                newObj = recurse(o[f], (p ? p + "." : "") + f);
                        }
                    }
                    else {
                        if (isArrayItem || isNumber(f))
                            newObj[p + "[" + f + "]"] = o[f];
                        else
                            newObj[(p ? p + "." : "") + f] = o[f];
                    }
                }
                if (isEmptyObj(newObj))
                    return obj;
                return newObj;
            }
            function isNumber(f) {
                return !isNaN(parseInt(f));
            }
            function isEmptyObj(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }
                return true;
            }
            return recurse(obj, prefix);
        }
        util.dotize = dotize;
        function applyMixins(derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }
        util.applyMixins = applyMixins;
        var DependencySorter = (function () {
            function DependencySorter() {
                this.items = [];
                this.dependencies = {};
                this.dependsOn = {};
                this.missing = {};
                this.circular = {};
                this.hits = {};
                this.sorted = {};
            }
            DependencySorter.prototype.add = function (items) {
                var _this = this;
                Object.keys(items).forEach(function (name) {
                    _this.addItem(name, items[name]);
                });
            };
            DependencySorter.prototype.addItem = function (name, deps) {
                if (typeof deps === 'undefined') {
                    deps = deps || [];
                }
                else if (typeof deps === 'string') {
                    deps = deps.toString().split(/,\s?/);
                }
                this.setItem(name, deps);
            };
            DependencySorter.prototype.setItem = function (name, deps) {
                var _this = this;
                this.items.push(name);
                deps.forEach(function (dep) {
                    _this.items.push(dep);
                    if (!_this.dependsOn[dep]) {
                        _this.dependsOn[dep] = {};
                    }
                    _this.dependsOn[dep][name] = name;
                    _this.hits[dep] = 0;
                });
                this.items = _.uniq(this.items);
                this.dependencies[name] = deps;
                this.hits[name] = 0;
            };
            DependencySorter.prototype.sort = function () {
                var _this = this;
                this.sorted = [];
                var hasChanged = true;
                while (this.sorted.length < this.items.length && hasChanged) {
                    hasChanged = false;
                    Object.keys(this.dependencies).forEach(function (item) {
                        if (_this.satisfied(item)) {
                            _this.setSorted(item);
                            _this.removeDependents(item);
                            hasChanged = true;
                        }
                        _this.hits[item]++;
                    });
                }
                return this.sorted;
            };
            DependencySorter.prototype.satisfied = function (name) {
                var _this = this;
                var pass = true;
                this.getDependents(name).forEach(function (dep) {
                    if (_this.isSorted(dep)) {
                        return;
                    }
                    if (!_this.exists(name)) {
                        _this.setMissing(name, dep);
                        if (pass) {
                            pass = false;
                        }
                    }
                    if (_this.hasDependents(dep)) {
                        if (pass) {
                            pass = false;
                        }
                    }
                    else {
                        _this.setFound(name, dep);
                    }
                    if (_this.isDependent(name, dep)) {
                        _this.setCircular(name, dep);
                        if (pass) {
                            pass = false;
                        }
                    }
                });
                return pass;
            };
            DependencySorter.prototype.setSorted = function (item) {
                this.sorted.push(item);
            };
            DependencySorter.prototype.exists = function (item) {
                return this.items.indexOf(item) !== -1;
            };
            DependencySorter.prototype.removeDependents = function (item) {
                delete this.dependencies[item];
            };
            DependencySorter.prototype.setCircular = function (item, item2) {
                this.circular[item] = this.circular[item] || {};
                this.circular[item][item2] = item2;
            };
            DependencySorter.prototype.setMissing = function (item, item2) {
                this.missing[item] = this.missing[item] || {};
                this.missing[item][item2] = item2;
            };
            DependencySorter.prototype.setFound = function (item, item2) {
                if (typeof this.missing[item] !== 'undefined') {
                    delete this.missing[item][item2];
                    if (Object.keys(this.missing[item]).length > 0) {
                        delete this.missing[item];
                    }
                }
            };
            DependencySorter.prototype.isSorted = function (item) {
                return typeof this.sorted[item] !== 'undefined';
            };
            DependencySorter.prototype.requiredBy = function (item) {
                return typeof this.dependsOn[item] !== 'undefined' ? this.dependsOn[item] : [];
            };
            DependencySorter.prototype.isDependent = function (item, item2) {
                return typeof this.dependsOn[item] !== 'undefined' && typeof this.dependsOn[item][item2] !== 'undefined';
            };
            DependencySorter.prototype.hasDependents = function (item) {
                return typeof this.dependencies[item] !== 'undefined';
            };
            DependencySorter.prototype.hasMissing = function (item) {
                return typeof this.missing[item] !== 'undefined';
            };
            DependencySorter.prototype.isMissing = function (dep) {
                var _this = this;
                var missing = false;
                Object.keys(this.missing).forEach(function (item) {
                    var deps = _this.missing[item];
                    if (deps.indexOf(dep) !== -1) {
                        missing = true;
                    }
                });
                return missing;
            };
            DependencySorter.prototype.hasCircular = function (item) {
                return typeof this.circular[item] !== 'undefined';
            };
            DependencySorter.prototype.isCircular = function (dep) {
                var _this = this;
                var circular = false;
                Object.keys(this.circular).forEach(function (item) {
                    var deps = _this.circular[item];
                    if (deps.indexOf(dep) !== -1) {
                        circular = true;
                    }
                });
                return circular;
            };
            DependencySorter.prototype.getDependents = function (item) {
                return this.dependencies[item];
            };
            DependencySorter.prototype.getMissing = function (str) {
                if (typeof str === 'string') {
                    return this.missing[str];
                }
                return this.missing;
            };
            DependencySorter.prototype.getCircular = function (str) {
                if (typeof str === 'string') {
                    return this.circular[str];
                }
                return this.circular;
            };
            DependencySorter.prototype.getHits = function (str) {
                if (typeof str === 'string') {
                    return this.hits[str];
                }
                return this.hits;
            };
            return DependencySorter;
        }());
        util.DependencySorter = DependencySorter;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        function create() {
            return new Deferred(DispatchDeferred);
        }
        util.create = create;
        function when(value) {
            if (value instanceof Promise) {
                return value;
            }
            return create().resolve(value).promise;
        }
        util.when = when;
        function DispatchDeferred(closure) {
            setTimeout(closure, 0);
        }
        var PromiseState;
        (function (PromiseState) {
            PromiseState[PromiseState["Pending"] = 0] = "Pending";
            PromiseState[PromiseState["ResolutionInProgress"] = 1] = "ResolutionInProgress";
            PromiseState[PromiseState["Resolved"] = 2] = "Resolved";
            PromiseState[PromiseState["Rejected"] = 3] = "Rejected";
        })(PromiseState || (PromiseState = {}));
        var Client = (function () {
            function Client(_dispatcher, _successCB, _errorCB) {
                this._dispatcher = _dispatcher;
                this._successCB = _successCB;
                this._errorCB = _errorCB;
                this.result = new Deferred(_dispatcher);
            }
            Client.prototype.resolve = function (value, defer) {
                var _this = this;
                if (typeof (this._successCB) !== 'function') {
                    this.result.resolve(value);
                    return;
                }
                if (defer) {
                    this._dispatcher(function () { return _this._dispatchCallback(_this._successCB, value); });
                }
                else {
                    this._dispatchCallback(this._successCB, value);
                }
            };
            Client.prototype.reject = function (error, defer) {
                var _this = this;
                if (typeof (this._errorCB) !== 'function') {
                    this.result.reject(error);
                    return;
                }
                if (defer) {
                    this._dispatcher(function () { return _this._dispatchCallback(_this._errorCB, error); });
                }
                else {
                    this._dispatchCallback(this._errorCB, error);
                }
            };
            Client.prototype._dispatchCallback = function (callback, arg) {
                var result, then, type;
                try {
                    result = callback(arg);
                    this.result.resolve(result);
                }
                catch (err) {
                    this.result.reject(err);
                    return;
                }
            };
            return Client;
        }());
        var Deferred = (function () {
            function Deferred(_dispatcher) {
                this._dispatcher = _dispatcher;
                this._stack = [];
                this._state = PromiseState.Pending;
                this.promise = new Promise(this);
            }
            Deferred.prototype._then = function (successCB, errorCB) {
                if (typeof (successCB) !== 'function' && typeof (errorCB) !== 'function') {
                    return this.promise;
                }
                var client = new Client(this._dispatcher, successCB, errorCB);
                switch (this._state) {
                    case PromiseState.Pending:
                    case PromiseState.ResolutionInProgress:
                        this._stack.push(client);
                        break;
                    case PromiseState.Resolved:
                        client.resolve(this._value, true);
                        break;
                    case PromiseState.Rejected:
                        client.reject(this._error, true);
                        break;
                }
                return client.result.promise;
            };
            Deferred.prototype.resolve = function (value) {
                if (this._state !== PromiseState.Pending) {
                    return this;
                }
                return this._resolve(value);
            };
            Deferred.prototype._resolve = function (value) {
                var _this = this;
                var type = typeof (value), then, pending = true;
                try {
                    if (value !== null &&
                        (type === 'object' || type === 'function') &&
                        typeof (then = value.then) === 'function') {
                        if (value === this.promise) {
                            throw new TypeError('recursive resolution');
                        }
                        this._state = PromiseState.ResolutionInProgress;
                        then.call(value, function (result) {
                            if (pending) {
                                pending = false;
                                _this._resolve(result);
                            }
                        }, function (error) {
                            if (pending) {
                                pending = false;
                                _this._reject(error);
                            }
                        });
                    }
                    else {
                        this._state = PromiseState.ResolutionInProgress;
                        this._dispatcher(function () {
                            _this._state = PromiseState.Resolved;
                            _this._value = value;
                            var i, stackSize = _this._stack.length;
                            for (i = 0; i < stackSize; i++) {
                                _this._stack[i].resolve(value, false);
                            }
                            _this._stack.splice(0, stackSize);
                        });
                    }
                }
                catch (err) {
                    if (pending) {
                        this._reject(err);
                    }
                }
                return this;
            };
            Deferred.prototype.reject = function (error) {
                if (this._state !== PromiseState.Pending) {
                    return this;
                }
                return this._reject(error);
            };
            Deferred.prototype._reject = function (error) {
                var _this = this;
                this._state = PromiseState.ResolutionInProgress;
                this._dispatcher(function () {
                    _this._state = PromiseState.Rejected;
                    _this._error = error;
                    var stackSize = _this._stack.length, i = 0;
                    for (i = 0; i < stackSize; i++) {
                        _this._stack[i].reject(error, false);
                    }
                    _this._stack.splice(0, stackSize);
                });
                return this;
            };
            return Deferred;
        }());
        var Promise = (function () {
            function Promise(_deferred) {
                this._deferred = _deferred;
            }
            Promise.prototype.then = function (successCB, errorCB) {
                return this._deferred._then(successCB, errorCB);
            };
            Promise.prototype.otherwise = function (errorCB) {
                return this._deferred._then(undefined, errorCB);
            };
            Promise.prototype.always = function (errorCB) {
                return this._deferred._then(errorCB, errorCB);
            };
            return Promise;
        }());
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var util;
    (function (util) {
        util.namespacePrefix = 'codex.';
        function widget(name, parent) {
            return function (cls) {
                if (parent) {
                    $.widget(util.namespacePrefix + name, new cls, parent);
                }
                else {
                    $.widget(util.namespacePrefix + name, new cls);
                }
            };
        }
        util.widget = widget;
        var Widget = (function () {
            function Widget() {
                var myPrototype = Widget.prototype;
                $.each(myPrototype, function (propertyName, value) {
                    delete myPrototype[propertyName];
                });
            }
            Widget.prototype._create = function () {
                return undefined;
            };
            Widget.prototype._destroy = function () {
            };
            Widget.prototype._init = function () {
                return undefined;
            };
            Widget.prototype._delay = function (fn, delay) {
                return undefined;
            };
            Widget.prototype._focusable = function (element) {
                return undefined;
            };
            Widget.prototype._getCreateEventData = function () {
                return undefined;
            };
            Widget.prototype._getCreateOptions = function () {
                return undefined;
            };
            Widget.prototype._hide = function (element, option, callback) {
                return undefined;
            };
            Widget.prototype._hoverable = function (element) {
                return undefined;
            };
            Widget.prototype._off = function (element, eventName) {
                return undefined;
            };
            Widget.prototype._on = function (element, handlers) {
                return undefined;
            };
            Widget.prototype._setOption = function (key, value) {
                return undefined;
            };
            Widget.prototype._setOptions = function (options) {
                return undefined;
            };
            Widget.prototype._show = function (element, option, callback) {
                return undefined;
            };
            Widget.prototype._super = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i - 0] = arguments[_i];
                }
            };
            Widget.prototype._superApply = function (args) {
            };
            Widget.prototype._trigger = function (type, args, data) {
                return undefined;
            };
            Widget.prototype.destroy = function () {
            };
            Widget.prototype.disable = function () {
            };
            Widget.prototype.enable = function () {
            };
            Widget.prototype.instance = function () {
                return undefined;
            };
            Widget.prototype.option = function (arg) {
                return undefined;
            };
            return Widget;
        }());
        util.Widget = Widget;
    })(util = codex.util || (codex.util = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    codex.util.registerJQueryHelpers();
    var _config;
    function init(options) {
        if (options === void 0) { options = {}; }
        codex.debug = new codex.util.Debug('Codex');
        codex.debug.setStartDate(new Date);
        _config = new codex.util.Config(codex.defaultConfig);
        codex.config = codex.util.Config.makeProperty(_config);
        codex.config.merge(options);
        if (codex.config('debug')) {
            codex.debug.enable();
        }
        codex.api = new codex.Api(codex.config('apiUrl'));
    }
    codex.init = init;
})(codex || (codex = {}));
//# sourceMappingURL=codex.js.map