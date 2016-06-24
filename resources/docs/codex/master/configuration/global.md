<!---
title: Global
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

    'http' => [/***/],

    'log' => true,

    'dev' => [/***/],

    'document' => [/***/],
    
    'macros'                      => [/***/],

    'default_project_config'      => [/***/],

    'default_document_attributes' => [/***/],
    
];

```

#### display_name
**type:** _string_  
The name that will be showed in the header, footer and some other locations on the website.

#### default_project
**type:** _string_  
The default project. If one where to navigate to the root url, they would be automatically redirected to this project's index.
 
#### paths
```php
[
    'docs'     => env('CODEX_ROOT_DIR', base_path('resources/docs')),
    'stubs'    => __DIR__ . '/../resources/stubs',
    'manifest' => storage_path('codex.json'),
    'log'      => storage_path('logs/codex.log'),
];
```

##### paths.docs
**type:** _string_  
The directory where your documentation is placed. This is the directory containing all projects.
 
##### paths.stubs
**type:** _string_  
The generator stub files. Can be published and altered.

##### paths.manifest
**type:** _string_  
File path to the `manifest.json` file, which is written by the `codex/composer-plugin` package.

##### paths.log
**type:** _string_  
File path to the `codex.log` file. 


#### http
```php
[
    'enabled'              => true,
    'base_route'           => env('CODEX_BASE_ROUTE', 'codex'),
    'ignore_project_names' => [ '_debugbar', ],
    'api'                  => [
        'enabled'    => true,
        'middleware' => [ ],
        'tokens'     => [ ],
    ],
];
```

##### http.enabled
**type:** _bool_  
If true, Codex will register HTTP routes. Can be disabled if you have custom logic in place.
 
##### http.base_route
**type:** _string_  
The base route (or rather, route prefix) for codex. If empty, you can host codex directly from the root domain.
By default: `http://localhost/codex`
Leaving it empty: `http://localhost`

##### http.ignore_project_names
**type:** _array(string)_  
To exclude `http://localhost/{name}`. This is usefull if you'd like to add routes that shouldn't be resolved by Codex. 

##### http.api
Todo..

###### http.api.enabled
**type:** _bool_  
If true, the API will be enabled and accessible on `api/v1`. Check the RESTFull API documents for more information.

#### log
**type:** _bool_  
Enable/disable writing the `codex.log`. The log is purely there for reference. Enabling or disabling does not affect the application workings.

#### dev
Todo...
```php
[
    'enabled'      => env('CODEX_DEV_ENABLED', false),
    'debugbar'     => true,
    'log_handlers' => true,
    'print_events' => true,
];
```


#### document
Configuration concerning documents
```php
[
    'cache'      => [
        'mode'    => null,
        'minutes' => null,
    ],
    'extensions' => [
        'md'       => 'codex.document',
        'markdown' => 'codex.document',
        'html'     => 'codex.document',
        'rst'      => 'codex.document',
    ],
];
```
##### document.cache.mode
- `true`: enabled
- `false`: disabled
- `null`: disabled when `app.debug` is true

##### document.cache.minutes
Whenever a document's last modified time changes, the document's cache is refreshed.
It is possible to set this to `null` making it refresh by checking `last modified`.
Alternatively, you can also set a max duration in minutes. Recommended is to put it on `null`

#### macros
Global defined macros. Check the [Macro Processor](../../processors/macros.md) page for more information. 
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