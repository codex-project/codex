<!---
title: Creating a project
subtitle: Getting started
-->


# Creating a project


## Command line helper
The easiest way to create a new project is using the command line;
```bash
php artisan codex:create {name?}
```


## Structure
You should follow this structure
```
- docs
    - {name}
        - config.php
        - {version}
            - index.md
            - menu.yml
            - other files..
```


## Minimum required files
### config.php
The config file for the project. 

#### display_name
The pretty name of the project

** Sub menu **
If you want to have this appear as a sub-menu item in the projects dropdown list. You can use the `::` delimiter.
For example `Addons :: Auth`.

#### filters
You can define specific filters to be enabled in a project.
```php
return [
    'display_name' => 'Addons :: Auth',
    'filters' => [
        'enabled' => ['attributes', 'markdown', 'toc'],
        'toc' => [
            'header_link_show'  => true,
         ]
    ]
];
```
A filter might accept configuration. This should be done as you can see with `filters.toc.header_link_show`. Refer to the documentation of the filter
to see what is configurable.

#### addons
You can define addons to be enabled in a project.
```php
return [
    'display_name' => 'Addons :: Auth',
    'phpdoc' => [
        'enabled'       => true,
        'default_class' => 'Codex\\\Codex',
    ]
];
```
A addon might accept configuration. This should be done as you can see with `phpdoc.default_class`. Refer to the documentation of the addon
to see what is configurable.


### index.md
The index markdown file. Every project version requires this index file.

### menu.yml
The menu YAML file. For the sidebar, everything should be placed inside the `menu` node.
A menu node can contain:

| Name       | Description                                                                                | Example                        |
|:-----------|:-------------------------------------------------------------------------------------------|:-------------------------------|
| `name`     | The displayed name                                                                         | `name: Getting Started`        |
| `icon`     | The font-awesome icon                                                                      | `icon: fa fa-eye`              |
| `document` | (optional) If set, the menu item will contain the href link to the specified document      | `document: index`              |
| `children` | (optional) If set, the document will not be a link but will be able to display as sub-menu |                                |
| `href`     | (optional) If set, the menu item will link to the specified href                           | `href: http://my-wesbwite.com` |



```yaml
menu:
  - name: Getting started
    icon: fa fa-eye
    children:

      - name: Overview
        document: index

      - name: Todo
        document: getting-started/todo

      - name: Installation
        document: getting-started/installation

      - name: Configuration
        document: getting-started/configuration

      - name: Creating a project
        document: getting-started/creating-a-project


  - name: Preview pages
    icon: fa fa-eye
    children:
      - name: Typography
        document: preview-pages/typography

      - name: ToC Tree
        document: preview-pages/toc-tree

      - name: Syntax highlighting
        document: preview-pages/syntax-highlight
```