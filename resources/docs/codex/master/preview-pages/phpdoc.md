<!--
title: PHPDoc
subtitle: Preview Pages   
-->


# PHPDoc

### Processor
By installing and enabling `codex/addon-phpdoc`, any project with `phpdoc` enabled will have the [phpdoc document](/codex/master/phpdoc).

It comes with these link processors:

| Example                                                                            | Code                                                                               |
|:-----------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------|
| [`Codex`](http://codex-project.ninja/codex/master/phpdoc#codex:phpdoc:Codex\Codex) | `[Codex](http://codex-project.ninja/codex/master/phpdoc#codex:phpdoc:Codex\Codex)` |
| [`Codex`](http://newsflash.com#codex:phpdoc:popover:Codex\Codex)                   | `[Codex](http://newsflash.com#codex:phpdoc:popover:Codex\Codex)`                   |
| [`Codex::url`](#codex:phpdoc:popover:Codex\Codex:url)                              | `[Codex::url](#codex:phpdoc:popover:Codex\Codex:url)`                              |


Simply add `#codex:phpdoc:xxxx` after the link.

### Custom Document
Just click on any of the example links. 