<?php

trait CacheTrait
{
	/**
	* Returns the cached content if NOT running locally.
	*
	* @param  string $key
	* @param  mixed  $value
	* @param  int    $time
	* @return mixed
	*/
	private function cached($key, $value, $time = 5)
	{
		if (App::environment('local') === false) {
			return $this->cache->remember($key, $time, function() use ($value) {
				return $value;
			});
		} else {
			return $value;
		}
	}
}
