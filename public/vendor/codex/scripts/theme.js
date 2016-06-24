var codex;
(function (codex) {
    var theme;
    (function (theme) {
        (function (LayoutMode) {
            LayoutMode[LayoutMode["DEFAULT"] = 0] = "DEFAULT";
            LayoutMode[LayoutMode["WIDE"] = 1] = "WIDE";
            LayoutMode[LayoutMode["SMALL"] = 2] = "SMALL";
        })(theme.LayoutMode || (theme.LayoutMode = {}));
        var LayoutMode = theme.LayoutMode;
        var Layout = (function () {
            function Layout() {
                this.$mode = 'default';
                this.$window = $(window);
                this.$document = $(document);
                this.$body = $('body');
                this.$head = $('head');
                this.setElements('nav', 'sidebar', 'wrapper', 'article', 'footer', 'breadcrumbs');
                this.init().then(function () {
                });
            }
            Layout.prototype.setElements = function () {
                var _this = this;
                var elems = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    elems[_i - 0] = arguments[_i];
                }
                elems.forEach(function (elem) { return _this['$' + elem] = $('[data-layout="' + elem + '"]'); });
            };
            Layout.prototype.$ = function (sel) {
                return this.$body.find(sel);
            };
            Layout.prototype.setLayoutMode = function (mode) {
                if (mode === LayoutMode.DEFAULT) {
                }
                else if (mode === LayoutMode.SMALL) {
                }
                else if (mode === LayoutMode.WIDE) {
                }
            };
            Layout.prototype.hideSidebar = function () {
                this.$body.ensureClass('sidebar-closed');
            };
            Layout.prototype.showSidebar = function () {
                this.$body.removeClass('sidebar-closed');
            };
            Layout.prototype.init = function () {
                var _this = this;
                var defer = codex.util.create();
                this.$body.on('click', 'a[data-action="sidebar-toggle"]', function (event) {
                    _this.toggleSidebar();
                });
                $(function () {
                    _this.$article.hasClass('loaded') === false && _this.$article.addClass('loaded');
                    $(window).scroll(function () {
                        if ($(this).scrollTop() > 100) {
                            $('.scrollToTop').fadeIn();
                        }
                        else {
                            $('.scrollToTop').fadeOut();
                        }
                    });
                    $('.scrollToTop').click(function () {
                        $('html, body').animate({ scrollTop: 0 }, 800);
                        return false;
                    });
                    defer.resolve();
                });
                return defer.promise;
            };
            Layout.prototype.toggleSidebar = function () {
                if (this.$body.hasClass('sidebar-closed')) {
                    this.showSidebar();
                }
                else {
                    this.hideSidebar();
                }
            };
            return Layout;
        }());
        theme.Layout = Layout;
    })(theme = codex.theme || (codex.theme = {}));
})(codex || (codex = {}));
var codex;
(function (codex) {
    var theme;
    (function (theme) {
        function init() {
            theme.layout = new theme.Layout();
            console.log('initing', theme.layout);
        }
        theme.init = init;
        console.log('sdfsdf');
    })(theme = codex.theme || (codex.theme = {}));
})(codex || (codex = {}));
//# sourceMappingURL=theme.js.map