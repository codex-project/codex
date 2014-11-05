<?php

return array(

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
