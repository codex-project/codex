var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var codex;
(function (codex) {
    var phpdoc;
    (function (phpdoc) {
        var defined = codex.util.defined;
        var create = codex.util.create;
        var PhpdocApi = (function (_super) {
            __extends(PhpdocApi, _super);
            function PhpdocApi(project, ref) {
                if (project === void 0) { project = ''; }
                if (ref === void 0) { ref = 'master'; }
                _super.call(this, codex.config('apiUrl'));
                this.ref = null;
                this.entities = {};
                this.sources = {};
                this.docs = {};
                this.popovers = {};
                this.project = project;
                this.ref = ref;
            }
            PhpdocApi.prototype.setProject = function (project) {
                this.project = project;
                this.entities = {};
            };
            PhpdocApi.prototype.setRef = function (ref) {
                this.ref = ref;
                this.entities = {};
            };
            PhpdocApi.prototype.entitiy = function (name) {
                var defer = create();
                if (codex.config('debug') === false && defined(this.entities[name])) {
                    defer.resolve(this.entities[name]);
                }
                else {
                    _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'entity'].join('/'), { entity: name }).then(function (res) { return defer.resolve(phpdoc.Entity.make(res.data)); });
                }
                return defer.promise;
            };
            PhpdocApi.prototype.method = function (name) {
                var defer = create();
                if (codex.config('debug') === false && defined(this.entities[name])) {
                    defer.resolve(this.entities[name]);
                }
                else {
                    _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'entity'].join('/'), { entity: name }).then(function (res) { return defer.resolve(phpdoc.Entity.make(res.data)); });
                }
                return defer.promise;
            };
            PhpdocApi.prototype.list = function (full) {
                if (full === void 0) { full = false; }
                var defer = create();
                _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'list'].join('/'), { full: full }).then(function (data) { return defer.resolve(data.data); });
                return defer.promise;
            };
            PhpdocApi.prototype.tree = function (full) {
                if (full === void 0) { full = false; }
                var defer = create();
                _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'tree'].join('/'), { full: full }).then(function (data) { return defer.resolve(data); });
                return defer.promise;
            };
            PhpdocApi.prototype.source = function (name) {
                var _this = this;
                var defer = create();
                if (codex.config('debug') === false && defined(this.sources[name])) {
                    defer.resolve(this.sources[name]);
                }
                else {
                    _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'source'].join('/'), { entity: name }).then(function (res) {
                        _this.sources[name] = res.data.source;
                        defer.resolve(res.data.source);
                    });
                }
                return defer.promise;
            };
            PhpdocApi.prototype.doc = function (name) {
                var _this = this;
                var defer = create();
                if (codex.config('debug') === false && defined(this.docs[name])) {
                    defer.resolve(this.docs[name]);
                }
                else {
                    _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'doc'].join('/'), { entity: name }).then(function (res) {
                        _this.docs[name] = res.data.doc;
                        defer.resolve(res.data.doc);
                    });
                }
                return defer.promise;
            };
            PhpdocApi.prototype.popover = function (name) {
                var _this = this;
                var defer = create();
                if (codex.config('debug') === false && defined(this.popovers[name])) {
                    defer.resolve(this.popovers[name]);
                }
                else {
                    _super.prototype.get.call(this, ['phpdoc', this.project, this.ref, 'popover'].join('/'), { name: name }).then(function (res) {
                        _this.popovers[name] = res.data;
                        defer.resolve(res.data);
                    });
                }
                return defer.promise;
            };
            return PhpdocApi;
        }(codex.Api));
        phpdoc.PhpdocApi = PhpdocApi;
    })(phpdoc = codex.phpdoc || (codex.phpdoc = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var phpdoc;
    (function (phpdoc) {
        var Entity = (function () {
            function Entity(e) {
                this.e = e;
                this.typeIcon = this.getTypeIcon();
                this.link = this.getLink();
            }
            Entity.prototype.getLink = function () {
                return window.location.pathname + "#!/" + this.e.full_name;
            };
            Entity.prototype.getTypeIcon = function () {
                switch (this.e.type) {
                    case 'class':
                        return 'fa fa-file-code-o color-green-500';
                    case 'interface':
                        return 'fa fa-code color-purple-800';
                    case 'trait':
                        return 'fa fa-terminal color-blue-500';
                }
                return '';
            };
            Entity.make = function (e) {
                return new Entity(e);
            };
            Entity.prototype.getClassLink = function () {
                return '';
            };
            return Entity;
        }());
        phpdoc.Entity = Entity;
    })(phpdoc = codex.phpdoc || (codex.phpdoc = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var phpdoc;
    (function (phpdoc) {
        var PhpdocHelper = (function () {
            function PhpdocHelper() {
                this._list = [];
                this._tree = {};
            }
            PhpdocHelper.prototype.init = function (project, ref) {
                var _this = this;
                if (project === void 0) { project = ''; }
                if (ref === void 0) { ref = 'master'; }
                this._api = new phpdoc.PhpdocApi(project, ref);
                this.defer = codex.util.create();
                async.parallel([
                    function (cb) { return _this.api.list().then(function (res) {
                        _this._list = res;
                        cb();
                    }); },
                    function (cb) { return _this.api.tree().then(function (res) {
                        _this._tree = res.data;
                        cb();
                    }); }
                ], function () {
                    _this.defer.resolve();
                });
                return this;
            };
            PhpdocHelper.prototype.ready = function (cb) {
                return this.defer.promise.then(cb);
            };
            Object.defineProperty(PhpdocHelper.prototype, "project", {
                get: function () {
                    return this._api.project;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhpdocHelper.prototype, "ref", {
                get: function () {
                    return this._api.ref;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhpdocHelper.prototype, "list", {
                get: function () {
                    return this._list;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhpdocHelper.prototype, "tree", {
                get: function () {
                    return this._tree;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhpdocHelper.prototype, "api", {
                get: function () {
                    return this._api;
                },
                enumerable: true,
                configurable: true
            });
            PhpdocHelper.prototype.initLinks = function () {
                var attr = {
                    trigger: 'hover',
                    html: true,
                    viewport: 'body',
                    container: 'body',
                    placement: 'top'
                };
                var $link = $('.phpdoc-link');
                $link.tooltip(_.merge(attr, {
                    template: "<div class=\"tooltip tooltip-phpdoc\" role=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>"
                }));
                var $popoverLink = $('.phpdoc-popover-link');
                $popoverLink.popover(_.merge(attr, {
                    template: "<div class=\"popover popover-phpdoc\" role=\"tooltip\"><div class=\"arrow\"></div><h3 class=\"popover-title\"></h3><div class=\"popover-content\"></div></div>"
                }));
            };
            PhpdocHelper.prototype.classLink = function (fullName) {
                return window.location.pathname + "#!/" + fullName;
            };
            PhpdocHelper.prototype.makeTypeLink = function (types) {
                var _this = this;
                var els = [];
                types.toString().split('|').forEach(function (type) {
                    var isAdvancedtype = type.indexOf('\\') !== -1;
                    if (!isAdvancedtype) {
                        els.push($('<span>')
                            .text(type)
                            .addClass('simple-type simple-type-' + type.toLowerCase())
                            .get(0)
                            .outerHTML);
                    }
                    else {
                        var found = _.find(_this._list, { full_name: type });
                        var $a = $('<a>')
                            .text(type.split('\\').reverse()[0])
                            .addClass('type-link')
                            .attr('title', type);
                        if (codex.util.defined(found)) {
                            $a.addClass('local');
                            $a.attr('href', _this.classLink(type));
                        }
                        els.push($a.get(0).outerHTML);
                    }
                });
                return els.join(' | ');
            };
            PhpdocHelper.prototype.methodCallsign = function (method) {
                var txt = method.visibility;
                if (method.abstract) {
                    txt = 'abstract ' + txt;
                }
                if (method.final) {
                    txt += ' final';
                }
                if (method.static) {
                    txt += ' static';
                }
                return txt;
            };
            PhpdocHelper.prototype.removeValues = function (arr) {
                var what, a = arguments, L = a.length, ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax = arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            };
            return PhpdocHelper;
        }());
        phpdoc.PhpdocHelper = PhpdocHelper;
        jQuery.extend({
            phpdoc: new PhpdocHelper
        });
    })(phpdoc = codex.phpdoc || (codex.phpdoc = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var phpdoc;
    (function (phpdoc) {
        var PhpdocWidget = (function (_super) {
            __extends(PhpdocWidget, _super);
            function PhpdocWidget() {
                _super.call(this);
                this.widgetEventPrefix = 'phpdoc';
                this.options = {
                    project: '',
                    ref: 'master',
                    defaultClass: null,
                    styleClasses: {
                        container: 'phpdoc',
                        tree: 'phpdoc-tree',
                        content: 'phpdoc-content',
                    },
                    jstree: {
                        'plugins': ['types', 'search', 'wholerow'],
                        'core': {
                            'themes': {
                                'responsive': false,
                                'name': 'codex'
                            }
                        },
                        'types': {
                            'default': { 'icon': 'fa fa-file' },
                            'folder': { 'icon': 'fa fa-folder color-blue-grey-500' },
                            'class': { icon: 'fa fa-file-code-o color-green-500' },
                            'interface': { icon: 'fa fa-code color-purple-800' },
                            'trait': { icon: 'fa fa-terminal color-blue-500' }
                        }
                    }
                };
                this.history = [];
                this.ignoreTreeSelect = false;
            }
            PhpdocWidget.prototype.$ = function (sel) {
                return this.element.find(sel);
            };
            PhpdocWidget.prototype._create = function () {
                var _this = this;
                if (codex.config('debug')) {
                    window['widget'] = this;
                }
                this.$el = this.element;
                this.data = { list: [], tree: {}, entities: [] };
                this.$el.html('');
                this.$el.ensureClass(this.options.styleClasses.container);
                this.$tree = $('<div>').addClass(this.options.styleClasses.tree).appendTo(this.$el);
                this.$treeRoot = $('<ul>').appendTo(this.$tree);
                this.$content = $('<div>').addClass(this.options.styleClasses.content).appendTo(this.$el);
                codex.startLoader(this.$content);
                $.phpdoc.init(this.options.project, this.options.ref);
                this.api = $.phpdoc.api;
                $.phpdoc.ready(function () {
                    _this.data.list = $.phpdoc.list;
                    _this.data.tree = $.phpdoc.tree;
                    codex.stopLoader(_this.$content);
                    _this._createTree();
                    var fullName;
                    if (location.hash.indexOf('#!/') !== -1) {
                        fullName = location.hash.replace(/\#\!\//, '');
                    }
                    else if (_this.options.defaultClass !== null) {
                        fullName = _this.options.defaultClass;
                    }
                    else {
                        fullName = _this.data.list[0].full_name;
                    }
                    window.history.replaceState(null, fullName, window.location.pathname + "#!/" + fullName);
                    window.addEventListener("popstate", function (event) {
                        console.log('popstate', window.location);
                        if (location.hash.indexOf('#!/') !== -1) {
                            _this.open(location.hash.replace(/\#\!\//, ''));
                        }
                    }, false);
                    _this.open(fullName);
                    _this._bindTreeListener();
                });
            };
            PhpdocWidget.prototype._createTree = function () {
                this._traverseTree(this.data.tree, this.$treeRoot, 0);
                this.$tree.jstree(this.options.jstree);
                this.tree = this.$tree.jstree();
            };
            PhpdocWidget.prototype._bindTreeListener = function () {
                var _this = this;
                this.$tree.on('select_node.jstree', this, function (event, data) {
                    if (_this.ignoreTreeSelect)
                        return;
                    codex.debug.log('select_node.jstree', data);
                    codex.debug.log('Selected type', data.node.type);
                    if (data.node.type === 'folder') {
                        _this.tree.open_node(data.node);
                    }
                    else {
                        var fullName = data.node.data.fullName;
                        _this.open(fullName);
                        window.history.pushState(null, fullName, window.location.pathname + "#!/" + fullName);
                    }
                });
            };
            PhpdocWidget.prototype.scrollToBegin = function () {
                $('html, body').animate({ scrollTop: this.$content.offset().top }, 800);
            };
            PhpdocWidget.prototype.open = function (name) {
                var _this = this;
                console.log('phpdoc open', name);
                codex.startLoader(this.$content);
                this.$('.type-link').tooltip('hide');
                codex.debug.profile('doc-request');
                this.api.doc(name).then(function (doc) {
                    codex.debug.profileEnd();
                    codex.stopLoader(_this.$content);
                    codex.debug.profile('doc-html');
                    _this.$content.html(doc);
                    codex.debug.profileEnd();
                    async.parallel([
                        function (cb) {
                            codex.debug.profile('tooltips');
                            _this.$('.type-link, .visibility-icon').tooltip({ viewport: 'body', container: 'body' });
                            cb();
                            codex.debug.profileEnd();
                        },
                        function (cb) {
                            codex.debug.profile('highlight');
                            Prism.highlightAll();
                            cb();
                            codex.debug.profileEnd();
                        },
                        function (cb) {
                            codex.debug.profile('tree');
                            _this.openTreeTo(name);
                            cb();
                            codex.debug.profileEnd();
                        },
                        function (cb) {
                            codex.debug.profile('scroll');
                            _this.scrollToBegin();
                            cb();
                            codex.debug.profileEnd();
                        }
                    ], function () {
                        console.log('cb done', arguments);
                    });
                }).otherwise(function (e) {
                    console.error(e);
                });
            };
            PhpdocWidget.prototype._traverseTree = function (items, $tree, level) {
                for (var k in items) {
                    var item = items[k];
                    if (isNaN(parseInt(k))) {
                        var $nel = $('<ul>');
                        var $nli = $('<li>').text(k).append($nel);
                        $nli.addClass('fs-12');
                        if (level == 0) {
                            $nli.attr('data-jstree', '{ "opened" : true, "type" : "folder" }');
                        }
                        else {
                            $nli.attr('data-jstree', '{ "type" : "folder" }');
                        }
                        var namePath = "\\" + k;
                        if (typeof $tree.closest('li').attr('data-full-name') !== "undefined") {
                            namePath = $tree.closest('li').attr('data-full-name') + namePath;
                        }
                        $nli.attr('data-full-name', namePath);
                        $tree.prepend($nli);
                        this._traverseTree(item, $nel, level++);
                    }
                    else {
                        $tree.append($('<li>')
                            .text(item['name'])
                            .attr('data-jstree', '{ "type": "' + item['type'] + '" }')
                            .attr('data-full-name', item['full_name']));
                    }
                }
            };
            PhpdocWidget.prototype.searchTree = function (fullName) {
                var items = this.tree.get_json(null, { flat: true });
                codex.debug.log('search for', fullName, 'in', items);
                var found = false;
                items.forEach(function (item) {
                    if (typeof item.data.fullName !== "undefined" && _.endsWith(item.data.fullName, fullName)) {
                        codex.debug.log('search for', fullName, 'found', item);
                        found = item;
                        return false;
                    }
                });
                return found;
            };
            PhpdocWidget.prototype.openTreeTo = function (fullName) {
                var node = this.searchTree(fullName);
                if (node !== false) {
                    this.ignoreTreeSelect = true;
                    this.tree.close_all();
                    this.tree._open_to(node);
                    this.tree.deselect_all();
                    this.tree.select_node(node);
                    this.ignoreTreeSelect = false;
                }
            };
            PhpdocWidget.prototype._destroy = function () {
                codex.debug.log('destroy');
            };
            PhpdocWidget = __decorate([
                codex.util.widget('phpdoc')
            ], PhpdocWidget);
            return PhpdocWidget;
        }(codex.util.Widget));
        phpdoc.PhpdocWidget = PhpdocWidget;
    })(phpdoc = codex.phpdoc || (codex.phpdoc = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var phpdoc;
    (function (phpdoc) {
        phpdoc.helper = new phpdoc.PhpdocHelper;
        function init(selector, options) {
            if (options === void 0) { options = {}; }
            $(function () { return $(selector).phpdoc(options); });
        }
        phpdoc.init = init;
    })(phpdoc = codex.phpdoc || (codex.phpdoc = {}));
})(codex || (codex = {}));
//# sourceMappingURL=phpdoc.js.map