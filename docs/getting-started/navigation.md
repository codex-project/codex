/*
title:  Navigation
Author: The Codex Project
*/

# Navigation

## Linking to other pages
Links to other pages within Codex are done relative to the current file. Just simply link to the Markdown file itself, like so:

```
[Introduction](../introduction.md)
```

Creates:

[Introduction](../introduction.md)

> Note that the relative link is pointing to the **physical file _from_** the current markdown file.

When linking to relative pages, Codex will automatically remove the `.md` file extension when it generates URLs.

## Table of contents
Codex will look for a `toc.md` (table of contents) file within the root of your documentation in order to load and render the main navigation for your documentation. This file is *optional* - if it does not exist, Codex will simply skip over it allowing your content to span the full width of the page. This is great for simple one page documentation.

### Structure
The `toc.md` file consists of a simple **unordered list** of relative links pointing to your markdown files. In the case of the default theme, navigation links are required to be nested under a parent list, like so:

```
- Header
	- [Page 1](page-1.md)
	- [Page 2](page-2.md)
	- [Page 3](page-3.md)
```

This can be configured differently if you are creating or modifying the theme for your own needs, as all the styling is done through CSS.
