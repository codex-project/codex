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
		$basePath = url('');
		return preg_replace('/href=\"(\/.*?)\"/', "href=\"$basePath$1\"", (new \Parsedown)->text($text));
	}
}
