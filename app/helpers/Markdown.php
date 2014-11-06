<?php

class Markdown
{
	/**
	 * Convert text from Markdown to HTML.
	 *
	 * @param  string $text
	 * @return string
	 */
	public static function parse($text, $pathPrefix = '')
	{
		$basePath = url('/' . ltrim($pathPrefix, '/'));
		$rendered = (new \Parsedown)->text($text);

		// Replace absolute relative paths (Paths that start with / but not //)
		$rendered = preg_replace('/href=\"(\/[^\/].*).md\"/', "href=\"$basePath$1\"", $rendered);
		// Replace relative paths (Paths that don't start with / or http://, https://, //, etc)
		$rendered = preg_replace('/href=\"(?!.*?\/\/)(.*).md\"/', "href=\"$basePath/$1\"", $rendered);

		return $rendered;
	}
}