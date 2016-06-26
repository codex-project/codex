<?php


return [
    'display_name' => 'Codex',

    'processors' => [
        'enabled' => [ 'attributes', 'parser', 'toc', 'header', 'phpdoc', 'macros', 'buttons', 'links', 'prismjs' ],
        'toc'     => [
            'header_link_show' => true,
        ],
        'prismjs' => [
            'plugins' => [

            ]
        ]
    ],

    'phpdoc' => [
        'enabled'       => true,
        'default_class' => 'Codex\\\Codex',
    ],

];
