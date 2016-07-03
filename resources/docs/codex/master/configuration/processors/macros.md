<!---
title: Macros
subtitle: Processors
-->


# Macros

### Overview

**API Documentation:** [MacrosProcessor](#phpdoc:popover:Codex\Processors\MacrosProcessor)

Macros allows you to inject content based on HTMLDocBlocks. This way it will not be displayed on for example Github,
but when opening the document in Codex, it will replace the Macros into its defined replacements.

### Example
```markdown
## Introduction
Codex can be considered as a documentation reading application. Though, you'll notice it does quite a few things more then simply showing it.
It can do things like transforming markdown or fetching documentation from a Bitbucket/Github repository whenever you push and much more.
Most of it's features are provided by addons. Codex is extenable, themeable, hackable and simple to setup and use.

<!--*codex:general:hide*-->
Head over to [codex-project.ninja](http://codex-project.ninja) for the full documentation (starting with this document) to get started.
<!--*codex:/general:hide*-->
```

Codex will transform this into:
```html
<h2>Introduction</h2>
<p>Codex can be considered as a documentation reading application. Though, you'll notice it does quite a few things more then simply showing it.
It can do things like transforming markdown or fetching documentation from a Bitbucket/Github repository whenever you push and much more.
Most of it's features are provided by addons. Codex is extenable, themeable, hackable and simple to setup and use.</p>

<div style="display:none">
    <p>Head over to <a href="http://codex-project.ninja">codex-project.ninja</a> for the full documentation (starting with this document) to get started.</p>
</div>
```

### Configuration
Macros can be either be configured globally, per project or per document.

#### Globally
Inside the `config/codex.php` configuration file
```php
[
    'macros' => [
        'general:hide' => 'App\Macros\General@hide'
    ]
]    
```

#### Project
Inside the `docs/{project-name}/config.php` configuration file
```php
[
    'macros' => [
        'general:hide' => 'App\Macros\General@hide'
    ]
]    
```

#### Document
As document attributes:
```markdown
<!--
title: Example document
subtitle: Examples
macros:
    'general:hide': App\Macros\General@hide
-->

# Example document
foo bar do.
```

### More information
How to create Macros is explained in the [Develop/Macros](../develop/macros.md) section