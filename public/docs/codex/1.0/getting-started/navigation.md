# Navigation

## Linking to other pages
Links to other pages within Codex are done through normal relative links. Just simply link to the Markdown file itself, like so:

```
[Introduction](/codex/1.0/introduction)
```

> Note that the relative link is pointing to the **physical file _from_** the base of the defined `storage_path` configuration option.

When linking to relative pages, Codex will automatically append the `.md` file extension when it attempts to load a Markdown file. So with that, there is no need to add the extension to the end of your URLs.

> **Notice:** If you do link to a page with the `.md` file extension appended, the link will result in a 404 error.

## Table of contents
Codex will look for a `toc.md` (table of contents) file within the root of your documentation in order to load and render the main navigation for your documentation. This file is *optional* - if it does not exist, Codex will simply skip over it allow your content to span the full width of the page. This is great for simple one page documentation.

### Structure
The `toc.md` file consists of a simple **unordered list** of relative links pointing to your markdown files. In the case of the default theme, navigation links are required to be nested under a parent list, like so:

```markdown
- Header
	- [Page 1](/page-1)
	- [Page 2](/page-1)
	- [Page 3](/page-1)
```

This can be configured differently if you are creating or modifying the theme for your own needs, as all the styling is done through CSS.
