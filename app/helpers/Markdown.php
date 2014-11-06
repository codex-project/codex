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
		$rendered = preg_replace('/href=\"(\/[^\/].*)\"/', "href=\"$basePath$1\"", $rendered);
		$rendered = preg_replace('/href=\"(?!.*?\/\/)(.*)\"/', "href=\"$basePath/$1\"", $rendered);

		return $rendered;
	}
}
