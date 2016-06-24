namespace codex.debugbar
{


    var listeners:{[key:string]: Function[]} = {};

    export function listenToDebugBar( fname:string, cb:Function )
    {
        if ( typeof listeners[ fname ] === 'undefined' ) {
            listeners[ fname ] = [];
        }
        listeners[ fname ].push( cb );
    }

    function fireListener( fname, obj:any, args:any[] = [] )
    {
        if ( typeof listeners[ fname ] !== 'undefined' ) {
            listeners[ fname ].forEach( ( cb:Function ) =>
            {
                cb.apply( obj, args );
            } )
        }
    }

    function initListeners()
    {
        var fnames:string[] = [ 'setHeight', 'resize', 'render', 'showTab', 'last' ];
        var extension:{}    = {};
        var originals:any   = function ()
        {
            return PhpDebugBar.DebugBar;
        }.call( window );
        fnames.forEach( ( fname:string ) =>
        {
            if ( fname === 'last' ) {
                PhpDebugBar.DebugBar = <IPhpDebugBarDebugBar> PhpDebugBar.DebugBar.extend( extension );
                return;
            }
            extension[ fname ] = function ()
            {

                var args:any[] = Array.prototype.slice.call( arguments ).slice();
                fireListener( fname + '.before', this, args );
                fireListener( fname, this, args );
                originals[ 'prototype' ][ fname ].apply( this, arguments );
                fireListener( fname + '.after', this, args );
            };
        } );
    }

    initListeners();
}
namespace codex.debugbar.phpdebugbar
{


    /**
     * The @widget decorator registers a widget
     * ```typescript
     * module codex.extensions {
     *      @extension('code-block', { })
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param name
     * @param parent
     * @returns {function(codex.widgets.Widget): void}
     */
    export function widget( name:string ):( cls:typeof phpdebugbar.Widget )=>void
    {
        return ( cls:typeof phpdebugbar.Widget ):void =>
        {
            var widget:phpdebugbar.Widget = new cls;
            PhpDebugBar.Widgets[ name ]   = PhpDebugBar.Widget.extend( widget );
            //console.log('Widget', name, 'registered', cls, widget);
        };

    }

    export class Widget
    {
        [key:string]:any;

        public className:string;
        public $el:JQuery;
        public tagName:string;
        public defaults:{};
        protected _attributes:{};
        protected _boundAttributes:{};


        public render():void
        {

        };

        public initialize( options:{} ):void
        {

        };

        public set( attr:string|{} = {}, value:{} = {} ):void
        {

        };

        public has( attr:string ):boolean
        {
            return undefined;

        };

        public get( attr:string ):any
        {
            return undefined;

        };

        public bindAttr( attr:string, cb:Function ):void
        {

        };

        constructor()
        {
            // remove all members, they are only needed at compile time.
            var myPrototype = (<Function>Widget).prototype;
            $.each( myPrototype, ( propertyName, value )=>
            {
                delete myPrototype[ propertyName ];
            } );
        }


    }
}
namespace codex.debugbar.elements
{
    var $body    = $( 'body' );
    var tpls:any = {
        tabs   : ( cls:string ) =>
            $( `
            <div class="tabbable ${cls}">
                <ul class="nav nav-tabs" role="tablist">
                </ul>
                <div class="tab-content">
                </div>
            </div>
            ` ),
        tab    : ( id:string, text:string ) =>
            $( `
            <li role="presentation">
                <a href="#${id}" aria-controls="${id}" role="tab" data-toggle="tab">${text}</a>
            </li>
            ` ),
        content: ( id:string, text:string = '' ) =>
            $( `
            <div role="tabpanel" class="tab-pane" id="${id}">${text}</div>
            ` )
    };
    export enum TabSide {
        TOP, RIGHT, BOTTOM, LEFT
    }
    export class Tabs
    {
        $el:JQuery;
        $nav:JQuery;
        $content:JQuery;

        $panels:JQuery          = $();
        $tabs:JQuery            = $();
        tabs:{[key:string]:Tab} = {};

        constructor( side:TabSide )
        {
            this.$el      = tpls.tabs( this.getSideClass( side ) );
            this.$nav     = this.$el.find( 'ul.nav-tabs' );
            this.$content = this.$el.find( 'div.tab-content' );
        }

        public setActive( id:string )
        {
            this.$nav.find( 'a' ).removeClass( 'active' );
            this.$panels.removeClass( 'active' );
            this.tabs[ id ].show();

        }

        protected getSideClass( side:TabSide ):string
        {
            var str = 'tabs-' + TabSide[ side ];
            return str.toLocaleLowerCase();
        }

        public addTab( id:string, name:string ):Tab
        {
            var tab = this.tabs[ id ] = new Tab( this, id, name );

            return tab;
        }
    }
    export class Tab
    {
        $panel:JQuery;
        $tab:JQuery;
        $tabLink:JQuery;
        tabs:Tabs;

        constructor( tabs:Tabs, id:string, name:string )
        {
            this.tabs   = tabs;
            this.$tab   = tpls.tab( id, name ).appendTo( tabs.$nav );
            this.$panel = tpls.content( id ).appendTo( tabs.$content );

            tabs.$tabs   = tabs.$tabs.add( this.$tab );
            tabs.$panels = tabs.$panels.add( this.$panel );

            this.$tab.on( 'show.bs.tab', ( e:JQueryEventObject ) =>
            {
                this.tabs.$nav.find( 'li > a' ).removeClass( 'active' );
                $( e.target ).addClass( 'active' );
            } );
        }

        public show()
        {
            this.$panel.addClass( 'active' );
            this.$tab.addClass( 'active' );
            $( 'dsf' ).tab()
        }

        public hide()
        {

        }

        public hider( sdf:string, asdfsafd:string )
        {

        }


    }
}

namespace codex.debugbar
{

    //export var theme:Theme;
    export var _config:util.IConfig;

    @phpdebugbar.widget( 'CodexWidget' )
    export class CodexWidget extends phpdebugbar.Widget implements IPhpDebugBarWidget
    {
        // public $el:JQuery;
        public className:string = prefix;
               $panel:JQuery;
               $tabs:JQuery;
               $content:JQuery;
               tabs:elements.Tabs;
               items:Item[];


        public initialize( options:any )
        {
            this.set( options );
        }

        public render()
        {
            this.bindAttr( 'data', ( data:any ) =>
            {
                this.$panel = this.$el.parent();

                this.items = <Item[]> data.debugbar;
                this.tabs  = new elements.Tabs( elements.TabSide.LEFT );
                this.tabs.$el.appendTo( this.$el );
                this.items.forEach( ( item:Item ) =>
                {
                    var tab     = this.tabs.addTab( item.id, item.name );
                    var content = app[ 'content.types' ].get( item.type ).render( item );
                    tab.$panel.append( content );
                } );

                this.$panel.data( 'codex', this );

                this.resize();
                listenToDebugBar( 'setHeight.after', ( height:number ) =>
                {
                    this.resize();
                } );
            } );

        }

        public resize()
        {
            this.$el.height( this.$panel.height() - 2 );
        }


    }
    //_config = new util.Config(defaultConfig);
    //_config.merge(this.get('data'));
    //config = util.Config.makeProperty(_config);
    //theme  = new Theme(this);
    //theme.init(this.$el);
    //config.set('tabs', this.)
}
