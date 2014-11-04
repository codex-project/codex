# Documentation Structure

By default, Codex will look for folders in the `public/docs` directory. This can be changed through the `codex.php` config file under the `storage_path` key.

Codex supports multiple *manuals* with accompanying *versions* through a simple folder structure.

#### Manuals
Manuals refer to your projects. For instance, say you are the maintainer of a multitude of Laravel packages. Each package can have their *own* set of documentation within Codex.


#### Versions
Versions refer to tagged releases of your project. Going off our multitude of packages example above, each package can have their own set of documentation for each version - 1.0, 1.1, 2.0, etc.

Manuals and their accompanying versions will be auto-detected by Codex.

## Folder Structure

```
docs/
	|-- project/
		|-- 1.0/
			introduction.md
			toc.md
```

Markdown files can be stored within as many subdirectories as needed, allowing you to structure your documentation as you see fit. For example, Codex's documentation is laid out as follows:

```
docs/
	|-- codex/
		|-- 1.0/
			|-- contributing/
				guidelines.md
				psr-1-coding-style.md
				psr-2-coding-style.md
			|-- getting-started/
				configuration.md
				documentation-structure.md
				installation.md
			|-- learning-more/
				callouts.md
				github-flavored-markdown.md
				markdown-basics.md
			|-- preface/
				credits.md
				download.md
			introduction.md
			toc.md
```

## Required Files

There are only two files that are required, and both sit in the root of a project's version directory: `introduction.md` and `toc.md`.

- **`introduction.md`** is used as the root or index file for your documentation.
- **`toc.md`** is the *table of contents* for your documentation.
