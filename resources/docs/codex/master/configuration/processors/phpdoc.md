<!--
title: PHPDoc
subtitle: Processors
-->

# PHPDoc

### Overview 

**API Documentation:** [PhpdocProcessor](#phpdoc:popover:Codex\Addon\Phpdoc\PhpdocProcessor)

By using the `codex/addon-phpdoc` addon, it is possible to use the `phpdoc` filter to transform links by adding
tooltips or popovers that link directly to it's PHPDoc page.

| Example                                          | Code                                             |
|:-------------------------------------------------|:-------------------------------------------------|
| [`Codex`](#phpdoc:Codex\Codex)                   | `[Codex](#phpdoc:Codex\Codex)`                   |
| [`Codex`](#phpdoc:popover:Codex\Codex)           | `[Codex](#phpdoc:popover:Codex\Codex)`           |
| [`Codex::url`](#phpdoc:popover:Codex\Codex::url) | `[Codex::url](#phpdoc:popover:Codex\Codex::url)` |


### Configuration
Below is the default configuration. This goes into your `docs/{project-name}/config.php`
```php
[
    'filters' => [
        'enabled' => ['phpdoc'],
        'phpdoc' => [
            'tooltips'        => true,
            'classes'         => true,
            'methods'         => true,
            'link_attributes' => [
                'target' => '_blank',
            ],
        ]
    ],

    // For the filter to work, the addon has to be enabled and configured as well!    
    'phpdoc' => [
        'enabled' => true,
        'default_class' => 'Codex\\\Codex'
    ]
];
```