<!--
title: ToC
subtitle: Processors
-->


# Toc

### Overview

**API Documentation:** [TocProcessor](#phpdoc:popover:Codex\Processors\TocProcessor)

The ToC filter creates a Table of Contents navigation like you see on this page below the title.

### Configuration
Below shows the default configuration for `toc`
```php
[
    'filters' => [
        'enabled' => ['toc'],
        'toc' => [
            'disable'           => [ 1 ],
            'regex'             => '/<h(\d)>([\w\W]*?)<\/h\d>/',
            'list_class'        => 'toc',
            'header_link_class' => 'toc-header-link',
            'header_link_show'  => false,
            'header_link_text'  => '#',
            'minimum_nodes'     => 2,
            'view'              => 'codex::filters.toc',
        ]
    ]
]
```

##### disable

##### regex

##### list_class

##### header_link_class

##### header_link_show

##### header_link_text

##### minimum_nodes

##### view