<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Storage Driver
	|--------------------------------------------------------------------------
	|
	| Codex can support a multitude of different storage methods to retrieve
	| your documentation from. You may specify which one you're using
	| throughout your Codex installation here. By default, Codex is set to
	| use the "flat" driver method.
	|
	| Supported: "flat", "git"
	|
	*/

	'driver' => 'flat',

	/*
	|--------------------------------------------------------------------------
	| Storage Path
	|--------------------------------------------------------------------------
	|
	*/

	'storage_path' => public_path().'/docs',

	/*
	|--------------------------------------------------------------------------
	| Default Manual
	|--------------------------------------------------------------------------
	|
	*/

	'default_manual' => '',

	/*
	|--------------------------------------------------------------------------
	| Version Ordering
	|--------------------------------------------------------------------------
	|
	| Allows you to define if you wish the versions be ordered by numerics
	| first (1, 2, 3, a, b, c), or alphabetically (a, b, c, 1, 2, 3).
	|
	| Supported: "numerical", "alphabetically"
	|
	*/

	'version_ordering' => 'numerical',

	/*
	|--------------------------------------------------------------------------
	| Google Analytics Tracking Code
	|--------------------------------------------------------------------------
	|
	| If you'd like to track analytical data on your visitors, add your
	| Universal Analytics tracking code below. Otherwise, leave this as
	| null.
	|
	*/

	'tracking_code' => getenv('tracking_code'),

	/*
	|--------------------------------------------------------------------------
	| Last Modified Timestamp Format
	|--------------------------------------------------------------------------
	|
	| http://php.net/manual/en/function.date.php#refsect1-function.date-parameters
	|
	*/

	'modified_timestamp' => 'l, F d, Y'

);
