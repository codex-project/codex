<!---
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
-->

# Codex Documentation

## Introduction

Codex can be considered as a documentation reading application. Though, you'll notice it does quite a few things more then simply showing it.
It can do things like transforming markdown or fetching documentation from a Bitbucket/Github repository whenever you push and much more.
Most of it's features are provided by addons. Codex is extenable, themeable, hackable and simple to setup and use.


## Laravel
Codex is a PHP application based on Laravel 5 and can be installed as stand-alone or sub-component in your own (Laravel) project.

<!--*codex:general:hide*-->
## Documentation
Head over to [codex-project.ninja](http://codex-project.ninja) for the full documentation (starting with this document) to get started.
<!--*codex:/general:hide*-->

## How it works

**Codex** > **Projects** > **Versions** > **Documents** > **Processors**

- Codex can provide documentation for multiple projects. 
- Each project has one or more versions containing your documents. 
- Documents are passed trough filters, modifying it's content before displaying.

To give you an understanding of filters, lets take the ToC filter as example. It takes all headings in a document and generates a table of content at the start ([example](../index.md#)).

### Customs / extendables
#### Processors
Processors can modify the content output of a document. 

##### Example: phpdoc
- Mouse hover on the examples.
- When clicked, takes you to the given documentation



<!--*codex:table:responsive(123, 'hello', true)*-->

| Example                                               | Code                                                  |
|:------------------------------------------------------|:------------------------------------------------------|
| [`Codex`](../index.md#codex:phpdoc:Codex\Codex)                  | `[Codex](#codex:phpdoc:Codex\Codex)`                  |
| [`Codex`](../index.md#codex:phpdoc:popover:Codex\Codex)          | `[Codex](#codex:phpdoc:popover:Codex\Codex)`          |
| [`Codex::url`](../index.md#codex:phpdoc:popover:Codex\Codex:url) | `[Codex::url](#codex:phpdoc:popover:Codex\Codex:url)` |


<!--*codex:/table:responsive*-->

Simply adding to the project's `config.php` file:
```php
return [
    'filters' => ['phpdoc' ], # replaces links in documents, as the above example shows
    'phpdoc' => [
        # enables the addon
        # transforms phpdoc's structure.xml
        # adds a menu item to the project (configurable)
        'enabled' => true 
    ]
]
```

#### Hooks

#### Documents

#### Projects

### Configurable
- Codex has many configurable settings to alter the overall working of the application.
- Each project has individual configuration using the `config.php`
- Documents can be configured using Frontmatter or similar attribute configuration methods.  
- Each filter can be configured both in the project configuration or document attributes.


### File Structure
```
- docs
    - my-awesome-project
        - config.php
        - v1.0.0
            - menu.yml
            - index.md
            - contributing.md
        - v1.1.0
            - menu.yml
            - index.md
            - contributing.md
        - master
            - menu.yml
            - index.md
            - contributing.md
            - installation.md
            - configuration.md
        - develop
            - menu.yml
            - index.md
    - my-second-project
        - ...
```

