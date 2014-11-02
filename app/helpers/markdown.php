<?php
/**
* Convert text from Markdown to HTML.
*/
function markdown($text)
{
	return (new \Parsedown)->text($text);
}
