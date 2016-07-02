<?php


return [
    'display_name' => 'Example',

    'processors' => [
        'enabled'    => [ 'attributes', 'parser', 'toc', 'header', 'macros', 'buttons', 'links' ],

        # Example of default configurations for all processors

        # attributes        :: http://codex-project.ninja/codex/master/configuration/processors/attributes
        'attributes' => [
            'tags'           => [
                [ 'open' => '<!--*', 'close' => '--*>' ], // html, markdown
                [ 'open' => '---', 'close' => '---' ], // markdown (frontmatter)
            ],
            'remove_tags'    => true,
            'add_extra_data' => true,
        ],


        # parser            :: http://codex-project.ninja/codex/master/configuration/processors/parser
        'parser'     => [
            'parser'   => \Codex\Processors\Parser\MarkdownParser::class, // ParserInterface::getName() returns 'markdown'
            'markdown' => [
                'renderer' => \Codex\Processors\Parser\Markdown\CodexMarkdownRenderer::class,
            ],
            'creole'   => [

            ],
        ],


        # header            :: http://codex-project.ninja/codex/master/configuration/processors/header
        'header'     => [
            'view'                 => 'processors.header',
            'remove_from_document' => true,
            'remove_regex'         => '/<h1>(.*?)<\/h1>/',
        ],


        # links             :: http://codex-project.ninja/codex/master/configuration/processors/links
        'links'      => [
            'needle'  => 'codex',
            'links' => [
                // merges global                [processors.links]
                'project' => 'Codex\Processors\Links\Codex@project',
                'phpdoc'  => 'Codex\Addon\Phpdoc\PhpdocLink@handle',

                // merges document attributes   [processors.links]
            ],
        ],


        # macros            :: http://codex-project.ninja/codex/master/configuration/processors/macros
        'macros' => [
            // merges global                [processors.macros]
            'table:responsive' => 'Codex\Processors\Macros\Table@responsive',
            'general:hide'     => 'Codex\Processors\Macros\General@hide',
            'attribute:print'  => 'Codex\Processors\Macros\Attribute@printValue',

            // merges document attributes   [processors.macros]
        ],


        # toc               :: http://codex-project.dev/codex/master/configuration/processors/toc
        'toc'        => [
            'disable'           => [ 1 ],
            'regex'             => '/<h(\d)>([\w\W]*?)<\/h\d>/',
            'list_class'        => 'toc',
            'header_link_class' => 'toc-header-link',
            'header_link_show'  => false,
            'header_link_text'  => '#',
            'minimum_nodes'     => 2,
            'view'              => 'processors.toc',
        ],

        # buttons           :: http://codex-project.dev/codex/master/configuration/processors/buttons
        'buttons'    => [
            'type'                => 'groups',
            'groups'              => [
//            'group-id' => [
//                'button-id' => [
//                    'text'   => 'Haai',
//                    'href'   => 'http://goto.com/this',
//                    'target' => '_blank',
//                ],
//            ]
            ],
            'buttons'             => [
//            'button-id' => [
//                'text'   => 'Haai',
//                'icon' => 'fa fa-github',
//                'attr' => [
//                    'href'   => 'http://goto.com/this',
//                    'target' => '_blank',
//                ]
//            ],
            ],
            'wrapper_class'       => 'top-buttons',
            'group_wrapper_class' => 'top-button-group',
        ],


        # prismjs           :: http://codex-project.dev/codex/master/configuration/processors/prism
        'prismjs'    => [
            'js_path'                  => 'vendor/codex/scripts/prism.js',
            'css_path'                 => 'vendor/codex/styles/prism.css',
            'plugin_path'              => 'vendor/codex/vendor/prism/plugins',

            # enabled plugins
            'plugins'                  => [
                'autoloader',
//            'autolinker',

//            'command-line',
//            'file-highlight',
//            'highlight-keywords',
//            'ie8',
//            'jsonp-highlight',
//            'keep-markup',
//            'line-highlight',
//            'line-numbers',
//            'normalize-whitespace',
//            'previewer-angle',
//            'previewer-base',
//            'previewer-color',
//            'previewer-easing',
//            'previewer-gradient',
//            'previewer-time',
//            'remove-initial-line-feed',
//            'show-invisibles',
//            'show-language',
//            'unescaped-markup',
//            'wpd',
            ],

            # plugin config
            'autolinker'               => [ ],
            'autoloader'               => [
                'languages_path' => '/vendor/codex/vendor/prism/components/',
                'use_minified'   => true,
            ],
            'command-line'             => [ ],
            'file-highlight'           => [ ],
            'highlight-keywords'       => [ ],
            'ie8'                      => [ ],
            'jsonp-highlight'          => [ ],
            'keep-markup'              => [ ],
            'line-highlight'           => [ ],
            'line-numbers'             => [ ],
            'normalize-whitespace'     => [ ],
            'previewer-angle'          => [ ],
            'previewer-base'           => [ ],
            'previewer-color'          => [ ],
            'previewer-easing'         => [ ],
            'previewer-gradient'       => [ ],
            'previewer-time'           => [ ],
            'remove-initial-line-feed' => [ ],
            'show-invisibles'          => [ ],
            'show-language'            => [ ],
            'unescaped-markup'         => [ ],
            'wpd'                      => [ ],
        ],
    ],



    # Example of default addon configuration

    # phpdoc
    'phpdoc'     => [
        'enabled'       => false,
        'default_class' => 'Codex\\\Addon\\\Git\\\GitServiceProvider',
    ],


    # git
    'git'        => [
        'enabled'    => false,
        'owner'      => 'codex-project',
        'repository' => 'addon-git',
        'connection' => 'github',
        'sync'       => [
            'constraints' => [
                'branches' => [ 'master' ],
                'versions' => '>=1.0.0', //1.x || >=2.5.0 || 5.0.0 - 7.2.3'
            ],
            'paths'       => [
                'docs'  => 'docs',
                'menu'  => 'docs/menu.yml',
                'index' => 'docs/index.md',
            ],
        ],
        'webhook'    => [
            'enabled' => true,
            'secret'  => env('CODEX_GIT_GITHUB_WEBHOOK_SECRET', ''),
        ],
    ],


    # auth
    'auth'       => [
        'enabled' => false,
        'driver'  => 'bitbucket',
        'allow'   => [
            'groups' => [ 'company' ],
            'users'  => [ 'robinradic' ],
        ],
    ],
];
