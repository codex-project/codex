Codex 2 - BETA! 
===============

[![GitHub Version](https://img.shields.io/github/tag/codex-project/core.svg?style=flat-square&label=version)](http://badge.fury.io/gh/codex-project%2Fcore)
[![Total Downloads](https://img.shields.io/packagist/dt/codex/core.svg?style=flat-square)](https://packagist.org/packages/codex/codex)
[![Documentation](https://img.shields.io/badge/goto-documentation-orange.svg?style=flat-square)](http://codex-project.ninja)
[![Source](http://img.shields.io/badge/source-codex-blue.svg?style=flat-square)](https://github.com/codex-project/codex)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)


Introduction
------------

Codex is a file-based documentation platform built on top of Laravel. It's completely customizable and dead simple to use to create beautiful documentation.

Codex is able to do things like transforming markdown or automaticaly fetching documentation from a Bitbucket/Github repositories. Most of it's features are provided by addons. Codex is extenable, themeable, hackable and simple to setup and use.

The package follows the FIG standards PSR-1, PSR-2, and PSR-4 to ensure a high level of interoperability between shared PHP code.


Features
--------

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




Documentation
-------------

Check out the [official documentation](http://codex-project.ninja).


Installation
------------

```bash
composer create-project codex/codex --stability=beta
cd codex
php artisan serve
```


License
-------
Copyright (c) 2015 Robin Radic, [MIT License](LICENSE.md)
