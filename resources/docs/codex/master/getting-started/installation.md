<!---
title: Installation
subtitle: Getting started
-->


# Installation

## New project

#### 1. Create project
```bash
composer create-project codex/codex
```

#### 2. Configure
You should now configure Codex to suit your needs. Head over to the [configuration](configuration.md) page.

#### 3. Serve
```bash
php artisan serve
```



## Existing project

#### 1. Add to composer
```bash
composer require codex/core
```

#### 2. Add service provider
```php
# config/app.php
return [
    // ...
    'providers' => [
        // ...
        Codex\CodexServiceProvider::class
    ]
];
```

#### 3. Publish and configure the configuration file
```bash
php artisan vendor:publish --provider=Codex\Core\CodexServiceProvider --tag=config
```

#### 4. Publish the asset files
```bash
php artisan vendor:publish --provider=Codex\Core\CodexServiceProvider --tag=public
```
        
#### 5. Publish the view files (optional)        
```bash
php artisan vendor:publish --provider=Codex\Core\CodexServiceProvider --tag=views
```

#### 6. Add composer `post-install-cmd` to auto hook to re-publish 
```json
{ 
    "scripts": {
        "post-install-cmd": [
            "Illuminate\\Foundation\\ComposerScripts::postInstall",
            "php artisan optimize",
            "php artisan vendor:publish --tag=public --force"
        ],
        "post-update-cmd": [
            "Illuminate\\Foundation\\ComposerScripts::postUpdate",
            "php artisan vendor:publish --tag=public --force"
        ]
    }
}
```

#### 7. Configure Codex
You should now configure Codex to suit your needs. Head over to the [configuration](configuration.md) page.