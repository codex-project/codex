/*
title:  Github Flavored Markdown
Author: The Codex Project
*/

# Github Flavored Markdown

Codex uses **GitHub Flavored Markdown**, or *GFM*, for all documentation markup. It differs from standard Markdown (SM) in a few significant ways, and adds some additional functionality.

If you're not already familiar with Markdown, take a look at [Markdown Basics](/codex/1.0/learning-more/markdown-basics).

## Differences from traditional Markdown

### Multiple underscores in words
"Normal" Markdown transforms underscores (`_`) into italics, such that `wow_great_stuff` becomes wow*great*stuff.

It is not reasonable to italicize just *part* of a word, especially when you're dealing with code and names often appear with multiple underscores. Therefore, GFM ignores underscores in words, like this:

- wow_great_stuff
- do_this_and_do_that_and_another_thing.

### URL autolinking
GFM will autolink standard URLs, so if you want to link to a URL (instead of setting link text), you can simply enter the URL and it will be turned into a link to that URL.

```
http://example.com
```

becomes

http://example.com

### Strikethrough
GFM adds syntax to create strikethrough text, which is missing from standard Markdown.

```
~~Mistaken text.~~
```

becomes

~~Mistaken text.~~

### Fenced code blocks
Standard Markdown converts text with four spaces at the beginning of each line into a code blockl; GFM also supports fenced blocks. Just wrap your code in ` ``` ` (three backticks; as shown below) and you won't need to indent it by four spaces.

> **Note** that although fenced code blocks don't have to be preceeded by a blank line -- unlike indented code blocks -- we recommend placing a blank line before them to make the raw Markdown easier to read.

	Here's an example:

	```
	function text() {
		console.log("notice the blank line before this function?");
	}
	```

### Syntax highlighting
Code blocks can be take a step further by adding syntax highlighting. In your fenced block, add an optional language identifier and we'll run it through syntax highlighting. For example, to syntax highlight PHP code:

	```php
	function sayHello()
	{
		echo "Hello World!";
	}

	sayHello();
	```

becomes

```php
function sayHello()
{
	echo "Hello World!";
}

sayHello();
```

### Tables
You can create tables by assembling a list of words and dividing them with hyphens `-` (for the first row), and then separating each column with a pipe `|`:

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

For aesthetic purposes, you can also add extra pipes on the ends:

```
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```

> **Note** that the dashes at the top don't need to match the length of the header text exactly.

```
| Name | Description            |
| ------------- | ------------- |
| Help     | ~~Display the~~ help window.|
| Close    | _Closes_ a window      |
```

becomes

| Name | Description            |
| ------------- | ------------- |
| Help     | ~~Display the~~ help window.|
| Close    | _Closes_ a window      |

Finally, by including colons `:` within the header row, you can define text to be left-aligned, right-aligned, or center-aligned:

```
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :--------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

becomes

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :--------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

- A colon on the **left-most** side indicates a left-aligned column.
- A colon on the **right-most** side indicates a right-aligned column.
- A colon on **both** sides indicates a center-aligned column.

## HTML
You can use a subset of HTML within your pages.
