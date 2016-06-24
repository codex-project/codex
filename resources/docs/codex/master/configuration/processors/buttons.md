<!--
title: Buttons
subtitle: Processors
buttons:
  type: groups
  groups:
    group-id-2:
      button-id-4: 
        text: Github
        href: https://github.com/codex-project/codex
        target: _blank
-->

# Buttons

### Overview

**API Documentation:** [ButtonsProcessor](#phpdoc:popover:Codex\Processors\ButtonsProcessor)

The Buttons filter allows you to place custom buttons at the top of your document. These buttons can be defined on project level or document level.

**Example:** Check the Github button at the top right of this document.

### Configuration

#### Project
```php
[
    'filters' => [
        'enabled' => ['buttons' ],
        // Define buttons for project. will be displayed on all documents.
        'buttons'     => [ ]
    ]
];
```

#### Document
To be able to define buttons with document attributes. The project should have the `buttons` filter enabled it its configuration.

```yaml
title: Overview
subtitle: Codex Documentation
buttons:
  type: groups
  groups:
    code_links:
      github: 
        text: Github
        href: https://github.com/codex-project/codex
        target: _blank
      packagist:
        text: Packagist
        href: https://github.com/codex-project/codex
        target: _blank
```

#### Examples

##### Groups
- This example will use the `groups` type. 
- The project is configured to show 3 buttons on all pages. 
- A random document appends a button to the group.


`docs/{project-name}/config.php`
```php
[
    'filters' => [
        'enabled' => ['buttons' ],
        'buttons'     => [
            'wrapper_class' => 'top-buttons',
            'type'          => 'groups',
            'groups'        => [
                'group-id' => [
                    'button-id-1' => [
                        'text'   => 'Haai',
                        'href'   => 'http://goto.com/this',
                        'target' => '_blank',
                    ],
                ],
                'group-id-2' => [
                    'button-id-2' => [
                        'text'   => 'Haai',
                        'href'   => 'http://goto.com/this',
                        'target' => '_blank',
                    ],
                    'button-id-3' => [
                        'text'   => 'Haai',
                        'href'   => 'http://goto.com/this',
                        'target' => '_blank',
                    ],
                ],
            ],
        ],
    ],
];
```

`docs/{project-name}/{version}/index.md`
```yaml
title: Overview
subtitle: Codex Documentation
buttons:
  groups:
    group-id-2:
      button-id-4: 
        text: Github
        href: https://github.com/codex-project/codex
        target: _blank
```


##### Grouped
```php
[
    'filters' => [
        'enabled' => ['buttons' ],
        'buttons'     => [
            'wrapper_class' => 'top-buttons',
            'type'          => 'grouped',
            'grouped'       => [
                'button-id' => [
                    'text'   => 'Haai',
                    'href'   => 'http://goto.com/this',
                    'target' => '_blank',
                ],
                'button-id-2' => [
                    'text'   => 'Haai',
                    'href'   => 'http://goto.com/this',
                    'target' => '_blank',
                ],
            ],

        ],
    ]
];
```