<!---
title: Overview
subtitle: Codex Documentation
buttons:
  type: buttons
  buttons:    
    github: 
      text: Github
      icon: fa fa-github    
      attr:
          href: https://github.com/codex-project/codex
          target: _blank
    packagist:
      text: Packagist
      attr:    
          href: https://packagist.org/packages/codex
          target: _blank
-->

# Codex Documentation

<!--*codex:general:hide*-->

> Head over to [codex-project.ninja](http://codex-project.ninja) for the full documentation (starting with this document) to get started.

<!--*codex:/general:hide*-->

## Introduction
**Codex** is a file-based documentation platform built on top of Laravel. It's completely customizable and dead simple to use to create beautiful documentation.

Codex is able to do things like transforming markdown or automaticaly fetching documentation from a Bitbucket/Github repositories.
Most of it's features are provided by addons. Codex is extenable, themeable, hackable and simple to setup and use.


### Features
- Laravel 5
- Markdown, Creole or custom document parsers
- Host a unlimited number of _projects/manuals_ with accompanying _versions_
- Extenable, themeable, hackable 
- Simple to setup and use
- Syntax Highlighting
- Easy navigation defined in YAML
- SEO Friendly URLs
- Default theme build on Laravels theme
- Multiple storage methods (local, dropbox, amazon, etc)
- Can be installed as stand-alone or sub-component in your own (Laravel) project.
- (Addon Feature) Github/Bitbucket (auto webhook) synchronisation based on tags/branches. 
- (Addon Feature) Smooth working, custom PHPDoc integration
- (Addon Feature) Access restriction on projects using Github/Bitbucket login
- Much, much more!




## How it works

**Codex** > **Projects** > **Versions** > **Documents** > **Processors**

- _Codex_ can provide documentation for multiple _projects_. 
- Each _project_ has one or more versions containing your _documents_. 
- _Documents_ are passed trough _processors_, modifying it's content before displaying.

To give you an understanding of filters, lets take the ToC filter as example. It takes all headings in a document and generates a table of content at the start ([example](../index.md#)).

### Addons
The `addon-*` packages are a collection of _Plugins_, _Hooks_ and _Processors_.

#### Plugins
Plugins are used to alter Codex. They are capable of doing something very minor or completely alter the way Codex works. 

- Adding routes/controllers
- Define custom document types
- Adding/changing views
- Adding/chaning assets
- Many more things.
- Extend the Codex API and structure with new features and functionality


#### Processors
Processors are used to alter the output of documents. 
 
- Reading document attributes
- Parsing Markdown/Creole/Anything to HTML
- Adding tooltips
- Inject HTML/Javascript
- Generate table of contents
- Altering links
- Many more things.  


#### Hooks
Hooks are able to execute when Codex executes code which have hook-points defined. This could be seen as a event dispatcher/listener.

- Allows minor or major modifications to Codex its inner workings.
- Codex is full of hook points with getters/setters to adjust class properties.
- Ensures code that doesn't have to be executed, won't be executed.


#### Example
The data is provided by the **PHPDoc Addon**. It uses the [`LinksProcessor`](#codex:phpdoc:popover:Codex\Processors\LinksProcessor) 
to alter the links based on the information provided by PHPDoc Addon. 

| Example                                                          | Code                                                             |
|:-----------------------------------------------------------------|:-----------------------------------------------------------------|
| [`Codex`](../index.md#codex:phpdoc:Codex\Codex)                  | `[Codex](#codex:phpdoc:Codex\Codex)`                             |
| [`Codex`](https://whatever.url#codex:phpdoc:popover:Codex\Codex) | `[Codex](https://whatever.url#codex:phpdoc:popover:Codex\Codex)` |
| [`Codex::url`](../index.md#codex:phpdoc:popover:Codex\Codex:url) | `[Codex::url](#codex:phpdoc:popover:Codex\Codex:url)`            |



- More information on how to use the [`LinksProcessor`](#codex:phpdoc:popover:Codex\Processors\LinksProcessor) [can be found here](develop/processors/links.md).
- More information on the PHPDoc Addon [should be here](addons/phpdoc.md).


### File Structure
A example file structure for Codex might look similar to: 
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

