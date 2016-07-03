<!---
title: Themes
subtitle: Develop
-->

# Themes

## Introduction
Codex does not come with a full blown theme library with it's own logic. It does however have some methods to deal with it.

### Views
- All views are registered in the [`Addons`](#phpdoc:popover:Codex\Addons\Addons) class.
- A view can be requested by using [`$codex->view()`](#phpdoc:popover:Codex\Codex::view). 
- A view can be set by using [`$addons->view()`](#phpdoc:popover:Codex\Addons\Addons::view)


### Scripts, styles etc
- Add scripts by using [`$theme->addScript()`](#phpdoc:popover:Codex\Theme::addScript)
- Add javascripts by using [`$theme->addJavascript()`](#phpdoc:popover:Codex\Theme::addJavascript)