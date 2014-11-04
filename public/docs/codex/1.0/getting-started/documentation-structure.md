# Documentation Structure

By default, Codex will look for folders in the `public/docs` directory. This can be changed through the `codex.php` config file under the `storage_path` key.

## Folder Structure
Codex supports multiple *manuals* with accompanying *versions* through a simple folder structure.

### Manuals
Manuals refer to your projects. For instance, say you are the maintainer of a multitude of Laravel packages. Each package can have their *own* set of documentation within Codex.


### Versions
Versions refer to tagged releases of your projects. Going off our multitude of packages example, each package can have their own set of documentation for each version - 1.0, 1.1, 2.0, etc.

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
