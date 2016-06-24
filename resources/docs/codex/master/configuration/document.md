<!---
title: Project
subtitle: Configuration
-->

# Configuration

## .env
You would probably want to add these lines to your `.env` file.
```bash
CODEX_DISPLAY_NAME=Codex
CODEX_BASE_ROUTE=codex
CODEX_DEFAULT_PROJECT=codex
CODEX_PROJECT_GITHUB_WEBHOOK_SECRET=codexsecret
CODEX_DEV_ENABLED=false

GITHUB_SECRET=
BITBUCKET_KEY=
BITBUCKET_SECRET=

CODEX_AUTH_BITBUCKET_ID=
CODEX_AUTH_BITBUCKET_SECRET=
CODEX_AUTH_GITHUB_ID=
CODEX_AUTH_GITHUB_SECRET=

CODEX_GIT_GITHUB_WEBHOOK_SECRET=
```

## config/codex.php
We'll split the config up into the major sections and take it from there
```php
return [

    'display_name' => env('CODEX_DISPLAY_NAME', 'Codex'),

    'default_project' => env('CODEX_DEFAULT_PROJECT', 'codex'),

    'paths' => [/***/],

    'routing' => [/***/],

    'api' => [/***/],

    'log' => [/***/],

    'dev' => [/***/],

    'extensions' => [/***/],
    
    'doctags'                     => [/***/],

    'default_project_config'      => [/***/],

    'default_document_attributes' => [/***/],
    
];

```

#### display_name
The name that will be showed in the header, footer and some other locations on the website.

#### default_project
The default project. If one where to navigate to the root url, they would be automatically redirected to this project's index.
 
#### paths
```php
[
    'docs'     => env('CODEX_ROOT_DIR', base_path('resources/docs')),
    'stubs'    => __DIR__ . '/../resources/stubs',
    'manifest' => storage_path('codex.json'),
]
```

##### paths.docs
The directory where your documentation is placed. This is the directory containing all projects.
 
##### paths.stubs
The generator stub files. Can be published and altered.

##### paths.manifest
File path to the `manifest.json` file, which is written by the `codex/composer-plugin` package.

#### routing
```php
[
    'enabled'              => true,
    'base_route'           => env('CODEX_BASE_ROUTE', 'codex'),
    'ignore_project_names' => [ '_debugbar', ],
];
```

##### routing.enabled
If true, Codex will register HTTP routes. Can be disabled if you have custom logic in place.
 
##### routing.base_route
The base route (or rather, route prefix) for codex. If empty, you can host codex directly from the root domain.
By default: `http://localhost/codex`
Leaving it empty: `http://localhost`

#### api
```php
[
    'enabled' => true,
    'tokens'  => [ ],
]
```

##### api.enabled
##### api.tokens


#### log
```php
[
    'enabled' => true,
    'path'    => storage_path('logs/codex.log'),
]
```

##### log.enabled
##### log.path

#### dev
```php
[
    'enabled'      => env('CODEX_DEV_ENABLED', false),
    'debugbar'     => true,
    'log_handlers' => true,
    'print_events' => true,
]
```

##### dev.enabled

#### extensions
```php
[
    'md'       => 'codex.document',
    'markdown' => 'codex.document',
    'html'     => 'codex.document',
]
```

#### doctags
```php
[
    'table:responsive' => 'Codex\Addons\Processors\DocTags\Table@responsive',
    'general:hide'     => 'Codex\Addons\Processors\DocTags\General@hide',
    'attribute:print'  => 'Codex\Addons\Processors\DocTags\Attribute@printValue',
]
```

#### default_project_config
```php
[
    'description' => '',
    'default'     => \Codex\Projects\Project::SHOW_LAST_VERSION_OTHERWISE_MASTER_BRANCH,
    'custom'      => null,
    'first'       => '',
    'index'       => 'index',
    'extensions'  => [ 'md', 'markdown', 'html' ],
    'filters'     => [
        'enabled' => [ ],
    ],
]
```


#### default_document_attributes
```php
[
    'author'          => 'John Doe',
    'title'           => '',
    'subtitle'        => '',
    'view'            => null,
    'disable_filters' => [ ],
    'buttons'         => [
    ],
    'filters'         => [
    ],
]
```