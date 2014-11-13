<?php

interface CodexRepositoryInterface
{
	/**
	 * Get manual's table of contents file, if it exists.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @return string
	 */
	public function getToc($manual, $version);

	/**
	 * Get the given documentation page.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $page
	 * @return string
	 */
	public function get($manual, $version, $page);

	/**
	 * Gets the given documentation page modification time.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $page
	 * @return mixed
	 */
	public function getUpdatedTimestamp($manual, $version, $page);

	/**
	 * Get all manuals from storage directory.
	 *
	 * @return array
	 */
	public function getManuals();

	/**
	 * Get all versions for the given manual.
	 *
	 * @param  string $manual
	 * @return array
	 */
	public function getVersions($manual);

	/**
	 * Get the default manual.
	 *
	 * @return mixed
	 */
	public function getDefaultManual();

	/**
	 * Get the default version for the given manual.
	 *
	 * @param  string $manual
	 * @return string
	 */
	public function getDefaultVersion($manual);

	/**
	 * Search manual for given string.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $needle
	 * @return array
	 */
	public function search($manual, $version, $needle = '');
}
