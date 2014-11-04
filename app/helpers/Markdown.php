<?php

class Markdown
{
	/**
	 * Convert text from Markdown to HTML.
	 *
	 * @param  string $text
	 * @return string
	 */
	public static function parse($text)
	{
		return (new \Parsedown)->text($text);
	}
}
