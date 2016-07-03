<!---
title: Hooks
subtitle: Develop
-->


## Hook points

| Hook point                 | Fired by                                                                                                                         |
|:---------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| `constructed`              | [`Codex\Codex::__construct`](hooks.md#codex:phpdoc:popover:Codex\Codex:__construct)                                              |
| `menus:constructed`        | [`Codex\Menus\Menus::__construct`](#codex:phpdoc:popover:Codex\Menus\Menus:__construct)                                          |
| `menu:construct`           | [`Codex\Menus\Menu::__construct`](#codex:phpdoc:popover:Codex\Menus\Menu::__construct)                                           |
| `menu:constructed`         | [`Codex\Menus\Menu::__construct`](#codex:phpdoc:popover:Codex\Menus\Menu::__construct)                                           |
| `menus:add`                | [`Codex\Menus\Menus::add`](#codex:phpdoc:popover:Codex\Menus\Menus::add)                                                         |
| `projects:construct`       | [`Codex\Projects\Projects::__construct`](#codex:phpdoc:popover:Codex\Projects\Projects::__construct)                             |
| `projects:resolve`         | [`Codex\Projects\Projects::resolve`](#codex:phpdoc:popover:Codex\Projects\Projects::resolve)                                     |
| `project:construct`        | [`Codex\Projects\Project::__construct`](#codex:phpdoc:popover:Codex\Projects\Project::__construct)                               |
| `project:constructed`      | [`Codex\Projects\Project::__construct`](#codex:phpdoc:popover:Codex\Projects\Project::__construct)                               |
| `project:make`             | [`Codex\Projects\Projects::resolve`](#codex:phpdoc:popover:Codex\Projects\Projects::resolve)                                     |
| `projects:resolved:node`   | [`Codex\Projects\Projects::resolve`](#codex:phpdoc:popover:Codex\Projects\Projects::resolve)                                     |
| `projects:resolved`        | [`Codex\Projects\Projects::resolve`](#codex:phpdoc:popover:Codex\Projects\Projects::resolve)                                     |
| `projects:constructed`     | [`Codex\Projects\Projects::__construct`](#codex:phpdoc:popover:Codex\Projects\Projects::__construct)                             |
| `documents:constructed`    | [`Codex\Documents\Documents::__construct`](#codex:phpdoc:popover:Codex\Documents\Documents::__construct)                         |
| `documents:resolve:path`   | [`Codex\Documents\Documents::resolvePathName`](#codex:phpdoc:popover:Codex\Documents\Documents::resolvePathName)                 |
| `documents:resolve`        | [`Codex\Documents\Documents::resolve`](#codex:phpdoc:popover:Codex\Documents\Documents::resolve)                                 |
| `document:construct`       | [`Codex\Documents\Document::__construct`](#codex:phpdoc:popover:Codex\Documents\Document::__construct)                           |
| `menus:forget`             | [`Codex\Menus\Menus::forget`](#codex:phpdoc:popover:Codex\Menus\Menus::forget)                                                   |
| `projects:sidebar:resolve` | [`Codex\Projects\Projects::resolveProjectSidebarMenu`](#codex:phpdoc:popover:Codex\Projects\Projects::resolveProjectSidebarMenu) |
| `projects:active`          | [`Codex\Projects\Projects::setActive`](#codex:phpdoc:popover:Codex\Projects\Projects::setActive)                                 |
| `document:constructed`     | [`Codex\Documents\Document::__construct`](#codex:phpdoc:popover:Codex\Documents\Document::__construct)                           |
| `project:document`         | [`Codex\Documents\Documents::resolve`](#codex:phpdoc:popover:Codex\Documents\Documents::resolve)                                 |
| `document:render`          | [`Codex\Documents\Document::render`](#codex:phpdoc:popover:Codex\Documents\Document::render)                                     |
| `document:rendered`        | [`Codex\Documents\Document::render`](#codex:phpdoc:popover:Codex\Documents\Document::render)                                     |
| `menu:render`              | [`Codex\Menus\Menu::render`](#codex:phpdoc:popover:Codex\Menus\Menu::render)                                                     |
| `menu:rendered`            | [`Codex\Menus\Menu::render`](#codex:phpdoc:popover:Codex\Menus\Menu::render)                                                     |

