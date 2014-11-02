<?php

use Illuminate\Filesystem\Filesystem;

class Documentation
{
	/**
	* The filesystem implementation.
	*
	* @var Filesystem
	*/
	protected $files;

	/**
	* Create a new documentation instance.
	*
	* @param  Filesystem $files
	* @return void
	*/
	public function __construct(Filesystem $files)
	{
		$this->files = $files;
	}

	/**
	* Get the documentation table of contents page.
	*
	* @param  string $version
	* @return string
	*/
	public function getToc($manual, $version)
	{
		return markdown($this->files->get(public_path().'/docs/'.$manual.'/'.$version.'/toc.md'));
	}

	/**
	* Get the given documentation page.
	*
	* @param  string $version
	* @param  string $page
	* @return string
	*/
	public function get($manual, $version, $page)
	{
		$page     = public_path().'/docs/'.$manual.'/'.$version.'/'.$page.'.md';
		$notFound = public_path().'/docs/404.md';

		if ($this->files->exists($page)) {
			return markdown($this->files->get($page));
		} else {
			return markdown($this->files->get($notFound));
		}
	}

	/**
	 * Get all manuals from documentation directory.
	 *
	 * @return array
	 */
	public function getManuals()
	{
		$documentationPath = public_path().'/docs';

		return $this->getDirectories($documentationPath);
	}

	/**
	 * Get all versions for the given manual.
	 *
	 * @param  string $manual
	 * @return array
	 */
	public function getVersions($manual)
	{
		$manualDir   = public_path().'/docs/'.$manual;

		return $this->getDirectories($manualDir);
	}

	/**
	 * Return an array of folders within the supplied path.
	 *
	 * @param  string $path
	 * @return array
	 */
	private function getDirectories($path)
	{
		$directories = $this->files->directories($path);
		$folders     = [];

		foreach ($directories as $dir) {
			$folder  = explode('/', $dir);
			$folders = end($folder);
		}

		return $folders;
	}
}
