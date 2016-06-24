<?php


return [
    'display_name' => 'Codex',

    'processors' => [
        'enabled' => [ 'attributes', 'parser', 'toc', 'header', 'phpdoc', 'macros', 'buttons', 'links', 'prismjs' ],
        'toc'     => [
            'header_link_show' => true,
        ],
    ],

    'phpdoc' => [
        'enabled'       => true,
        'default_class' => 'Codex\\\Codex',
    ],

    'git' => [
        'enabled'    => false,
        'owner'      => 'codex-project',
        'repository' => 'core',
        'connection' => 'github',
        'sync'       => [
            'constraints' => [
                'branches' => [ 'master' ],
                'versions' => '>=2.0.0', //1.x || >=2.5.0 || 5.0.0 - 7.2.3'
            ],
            'paths'       => [
                'docs'  => 'docs',
                'menu'  => 'docs/menu.yml',
                'index' => 'docs/index.md',
            ],
        ],
        'webhook'    => [
            'enabled' => true,
        ],
    ],
];
