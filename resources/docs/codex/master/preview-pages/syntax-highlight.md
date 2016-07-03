<!---
title: Syntax Highlighting
subtitle: Preview Pages
-->


### Code blocks

#### Inline
`php artisan vendor:publish --tag=config`

#### JSON
```JSON
"codex/codex": "~2.0"
```
  
#### SH
```bash
php artisan vendor:publish --tag=config
php artisan vendor:publish --tag=assets
php artisan vendor:publish --tag=views
```

#### PHP
```php
$codex->log($level, $message, $context = [ ]);
$codex->stack($viewName, $data = null, $appendTo = 'codex::layouts.default');

# @var string $path
$path       = $codex->getRootDir();

# @var string $url
$url        = $codex->url($project = null, $ref = null, $doc = null);

# @var boolean $hasProject
$hasProject = $codex->projects->has('codex-core');

/** @var \Codex\Projects\Project $project */ 
$project    = $codex->projects->get('codex-core');

# @var \Codex\Core\Components\Factory\Projects $projects 
$projects   = $codex->projects;

# @var \Codex\Core\Projects[] $projects 
$projects = ->all()
$projects   = $codex->projects->toArray();
foreach($projects as $project){
    $url = $project->url($doc = 'index', $ref = null);
    $project->path($path = null);           # string
    $project->hasEnabledProcessor($filter);    # bool
    $project->hasEnabledHook($hook);        # bool    
    $project->getRef();                     # string
    $project->getDefaultRef();              # string
    $project->getRefs();                    # array[string]
    $project->getSortedRefs();              # array[string]
    $project->getName();                    # string
    $project->getPath();                    # string    
    $project->getBranches();                # array[string]
    $project->getVersions();                # array[string]
        
    $project->documents->setExtensions(['md']);
    $project->documents->has($path); // without extension
    $project->documents->get($path); // without extension
    $documents = $project->documents->all();
}


# @var \Codex\Core\Projects[] $projects 
$documents = $codex->projects->get('codex-core')->documents->all()

# @var \Codex\Core\Projects[] $projects 
$document = $codex->projects->get('codex-core')->documents->get('api-uasge')

$document->render();
$document->attr($key = null, $default = null)
$document->url()
$document->getBreadcrumb()
$document->getPath()
$document->getContent()
$document->setContent($content)
$document->getAttributes((
$document->setAttributes(array $attr = [])
$document->mergeAttributes(array $attr = [])
$document->getProject()
$document->setPath($path)
```

#### Jade
```jade
doctype html
<!--[if IE 8]><html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]><html lang="en" class="ie9"><![endif]-->
<!--[if !IE]><!-->
html(lang="en")
    <!--<![endif]-->
    head
        block head
            title
                block title
                    |  !{typeof config !== 'undefined' ? config.title : 'Default'}
            block meta
                meta(charset="UTF-8")
                meta(name="viewport", content="width=device-width, initial-scale=1")
                meta(http-equiv="X-UA-Compatible", content="IE=edge")
            block styles
                +stylesheet('stylesheet')
                +stylesheet('themes/theme-' +themeStyle)(id='theme-style')

    block body
        body.page-loading(class=bodyClass)
            #page-loader
                .loader.loader-page

            block page-header
                .page-header.navbar(class=pageHeaderClass)
                    block page-header-inner
                        .page-header-inner
                            block header-logo
                                .page-logo
                                    .logo-packadic.pull-left

                                        block header-logo-inner
                                            | Codex
                                    block header-sidebar-toggler
                                    
                            block header-responsive-toggler
                                

                            .pull-right
                                block header-right
                                    

                .clearfix


            block page-container
                .page-container
                    .page-sidebar-wrapper
                        .page-sidebar.navbar-collapse.collapse
                            block page-sidebar
                                ul.page-sidebar-menu(class=sidebarClass)
                                    block page-sidebar-menu
                                        include ../partials/sidebar-items


                    .page-content-wrapper
                        block page-content-wrapper
                            .page-content
                                .page-head(class=pageHeadClass)
                                    .page-title
                                        h1
                                            block page-title
                                ul.page-breadcrumb.breadcrumb
                                    block breadcrumb
                                .page-content-seperator
                                block page-content
                                    .page-content-inner
                                        block content


            block page-footer
                .page-footer
                    .page-footer-inner
                        block page-footer-inner
                            - var year = (new Date()).getFullYear()
                            | Copyright &copy; P #{year}
                    block scroll-to-top
                        .scroll-to-top
                            i.fa.fa-level-up


            block scripts
                    +javascript('vendor')
                    +javascript('codex.util')
                    +javascript('codex')
                    +javascript('codex.addons')

```

#### SCSS
```scss
$optional: #7c9aa7;

.scrollToTop {
    width: 55px;
    height: 75px;
    padding: 0;
    z-index: 10;
    text-align: center;
    font-weight: 700;
    color: #444444;
    text-decoration: none;
    position: fixed;
    bottom: 15px;
    right: 15px;
    background: whiteSmoke;
    display: none;
    
}

.scrollToTop:hover {
    text-decoration: none;
}

.tag-optional {
    color: $optional !important;
    code {
        color: $optional !important;
    }
}
```

#### HTML
```html
<!DOCTYPE html><!--[if IE 8]><html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]><html lang="en" class="ie9"><![endif]-->
<!--[if !IE]><!-->
<html lang="en"><!--<![endif]-->
  <head>
    <title> Default</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="styles/stylesheet.css" rel="stylesheet" type="text/css">
    <link href="styles/themes/theme-codex.css" rel="stylesheet" type="text/css" id="theme-style">
  </head>
  <body class="page-loading page-header-fixed page-footer-fixed page-edged page-sidebar-condensed">
    <div id="page-loader">
      <div class="loader loader-page"></div>
    </div>
    <div class="page-header navbar navbar-fixed-top">
      <div class="page-header-inner">
        <div class="page-logo">
          <div class="logo-packadic pull-left">Codex</div>
          <div data-toggle="tooltip" title="Toggle the sidebar menu" data-layout-api="sidebar-toggle" data-placement="right" class="menu-toggler sidebar-toggler"></div>
        </div>
        <div class="page-actions">
          <div class="btn-group">
            <div class="btn-group"><a href="#" type="button" data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-primary btn-sm">Actions</a>
              <div class="dropdown-menu"><a href="#" class="dropdown-item">First</a>
                <div class="dropdown-divider bg-color-grey-300"></div><a href="#" class="dropdown-item">Second</a><a href="#" class="dropdown-item">Third</a><a href="#" class="dropdown-item">Fourth</a>
                <div class="dropdown-footer"><a href="#">Left</a><a href="#">Right</a>
                </div>
              </div>
            </div>
            <div class="btn-group"><a href="#" type="button" data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-primary btn-sm">Options</a>
              <div class="dropdown-menu"><a href="#" class="dropdown-item">First</a><a href="#" class="dropdown-item">Second</a>
                <div class="dropdown-submenu"><a href="#" class="dropdown-item">Submenu</a>
                  <div class="dropdown-menu"><a href="#" class="dropdown-item">First</a><a href="#" class="dropdown-item">Second</a>
                    <div class="dropdown-footer"><a href="#">Left</a><a href="#">Right</a>
                    </div>
                  </div>
                </div><a href="#" class="dropdown-item">Third</a>
                <div class="dropdown-divider bg-color-grey-300"></div><a href="#" class="dropdown-item">Fourth</a><a href="#" class="dropdown-item">Second 3
                  <div class="dropdown-submenu"><a href="#" class="dropdown-item">Submenu</a>
                    <div class="dropdown-menu"><a href="#" class="dropdown-item">First</a><a href="#" class="dropdown-item">Second</a><a href="#" class="dropdown-item">First</a><a href="#" class="dropdown-item">Second</a>
                      <div class="dropdown-footer"><a href="#">Left</a><a href="#">Right</a>
                      </div>
                    </div>
                  </div><a href="#" class="dropdown-item">Third</a></a>
                <div class="dropdown-footer"><a href="#">Left</a><a href="#">Right</a>
                </div>
              </div>
            </div>
          </div>
        </div><a href="javascript:;" data-toggle="collapse" data-target=".navbar-collapse" class="menu-toggler responsive-toggler"></a>
        <div class="pull-right">
          <div data-layout-api="qs-toggle" data-toggle="tooltip" title="Toggle the quick sidebar menu" data-placement="left" data-offset="0 10px" class="nav-link quick-sidebar-toggler"></div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="page-container">
      <div class="page-sidebar-wrapper">
        <div class="page-sidebar navbar-collapse collapse">
          <ul class="page-sidebar-menu">
            <li class="start"><a href="/index.html"><i class="fa fa-home"></i><span class="title">Home</span></a>
            </li>
            <li><a href="/layout-api.html"><i class="fa fa-bitcoin"></i><span class="title">API</span></a>
            </li>
            <li><a href="/angular.html"><i class="fa fa-css3"></i><span class="title">Angular2</span></a>
            </li>
            <li><a href="/doc.html"><i class="fa fa-file"></i><span class="title">Document</span></a>
            </li>
            <li><a href="/chatter.html"><i class="fa fa-comment"></i><span class="title">Chatter</span></a>
            </li>
            <li><a href="javascript:;"><i class="fa fa-puzzle-piece color-teal-800"></i><span class="title">Components</span><span class="arrow"></span></a>
              <ul class="sub-menu">
                <li><a href="/box.html"><span class="title">Box</span></a>
                </li>
                <li><a href="/bootstrap-components.html"><span class="title">Bootstrap</span></a>
                </li>
                <li><a href="/code-block.html"><span class="title">Code block</span></a>
                </li>
                <li><a href="/noty.html"><span class="title">Notifications</span></a>
                </li>
                <li><a href="/buttons.html"><span class="title">Buttons</span></a>
                </li>
              </ul>
            </li>
            <li><a href="javascript:;"><i class="fa fa-book color-teal-800"></i><span class="title">Documentation</span><span class="arrow"></span></a>
              <ul class="sub-menu">
                <li><a href="/docs/codex"><span class="title">Codex API</span></a>
                </li>
                <li><a href="/docs/util"><span class="title">Codex Util API</span></a>
                </li>
                <li><a href="/docs/addons"><span class="title">Codex Addons API</span></a>
                </li>
                <li><a href="/docs/scss"><span class="title">SCSS</span></a>
                </li>
              </ul>
            </li>
            <li class="last"><a href="https://github.com/packadic/framework"><i class="fa fa-git"></i><span class="title">GitHub</span></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="page-content-wrapper">
        <div class="page-content">
          <div class="page-head">
            <div class="page-title">
              <h1>Home</h1>
            </div>
          </div>
          <ul class="page-breadcrumb breadcrumb">
            <li><a href="index.html">Home</a>
            </li>
          </ul>
          <div class="page-content-seperator"></div>
          <div class="page-content-inner">
            <div class="row">
              <div class="col-md-12">
                <p>SCSS based on Bootstrap 4.0.0-alpha</p>
                <p>JS genrated by Typescript and several libraries</p>
                <p>HTML generated by Jade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div class="page-footer-inner">Copyright &copy; P 2016
      </div>
      <div class="scroll-to-top"><i class="fa fa-level-up"></i></div>
    </div>
    <script src="scripts/vendor.js"></script>
    <script src="scripts/codex.util.js"></script>
    <script src="scripts/codex.js"></script>
    <script src="scripts/codex.addons.js"></script>
    <script>
      (function(){
          var app = codex.Application.instance;
          app.DEBUG = true;
      }.call())
      
      
    </script>
    <script>
      (function() {
          var app = codex.Application.instance;
          if ( ! app.isInitialised ) {
              app.init();
          }
          app.boot().then(function (app) {
              app.debug.log('BOOTED FROM boot-script');
          });
      }.call())
      
    </script>
  </body>
</html>
```

#### Typescript
```typescript

/**
 * The Application class is the main class initialising and booting all other components, plugins, etc
 *
 * ```typescript
 * var app:codex.Application = codex.Application.instance
 * app.DEBUG = true;
 * app.init({
 *      customConfigVariable: 'asdf'
 * });
 * app.boot().then(function(app:codex.Application){
 *     // Application booted
 *     $('someElement').superDuperPlugin({
 *
 *     });
 * });
 * ```
 */
export class Application  implements IApplication  {


    /**
     * Default configuration values, these will be set after initial construction using getConfigDefaults()
     */
    public static defaults:any;

    protected static _instance:Application;


    /**
     * If true, the debug log will be enabled, with some other additions as well
     */
    public DEBUG:boolean;

    /**
     * @private
     */
    protected _events:EventEmitter2;

    /**
     * The configuration repository
     */
    public config:IConfigProperty;

    /**
     * @private
     */
    protected _config:IConfig;

    public isInitialised:boolean;
    public isBooted:boolean;

    public timers:any = {construct: null, init: null, boot: null};

    public get extensions():extensions.Extensions {
        return extensions.Extensions.instance;
    }

    constructor(options?: {}) {

        this._events = new EventEmitter2({
            wildcard: true,
            delimiter: ':',
            maxListeners: 1000,
            newListener: true
        });
        $body.data('codex', this);
        var self:Application = this;
        codex.app = this;



        Application.defaults = getConfigDefaults();

        this.timers.construct = new Date;
        this.isInitialised = false;
        this.isBooted = false;

    }

    /**
     * @returns {Application}
     */
    public static get instance() {
        if (typeof Application._instance === "undefined") {
            Application._instance = new Application();
            codex.app = Application._instance;
        }
        return Application._instance;
    }

    public init(opts:any = {}):Application {
        if (this.isInitialised) {
            return;
        } else {
            this.isInitialised = true;
        }
        this.emit('pre-init');
        console.groupEnd();

        this.timers.init = new Date;
        //Vue.config.debug = this.DEBUG;
        if (this.DEBUG) {
            this.debug.enable();
            this.debug.setStartDate(this.timers.construct);
            console.groupCollapsed('DEBUG: init');
        }

        this._config = new ConfigObject($.extend({}, Application.defaults, opts));
        this.config = ConfigObject.makeProperty(this._config);

        // get the stylesheet data from the head. also parse all int stuff
        try {
            var styles:any = JSON.parse(util.str.unquote($('head').css('font-family'), "'"));
            ['breakpoints', 'containers'].forEach((name:string) => {
                $.each(styles['style'][name], (key:string, val:string) => {
                    styles['style'][name][key] = parseInt(val);
                });
            });
            this.config.merge(styles);
        } catch(e){

        }


        this.extensions.loadAll();

        this.extensions.each((comp:codex.extensions.Extension) => {
            this[comp.name] = comp;
        });

        registerHelperPlugins();

        callReadyCallbacks(this);

        this.emit('init', this);
        if(this.DEBUG) console.groupEnd();
        return this;
    }
}     

```