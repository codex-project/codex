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

	'tracking_code' => $_ENV['tracking_code']

);
