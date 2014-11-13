<?php

use Illuminate\Config\Repository as Config;
use Illuminate\Filesystem\Filesystem;

class CodexRepositoryFlat extends AbstractCodexRepository
{
	use CacheTrait;

	/**
	 * The filesystem implementation.
	 *
	 * @var Filesystem
	 */
	protected $files;

	/**
	 * The config implementation.
	 *
	 * @var Config
	 */
	protected $config;

	/**
	 * Storage path.
	 *
	 * @var string
	 */
	protected $storagePath;

	/**
	 * Create a new CodexRepositoryFlat instance.
	 *
	 * @param  Config     $config
	 * @param  Filesystem $files
	 * @return void
	 */
	public function __construct(Config $config, Filesystem $files)
	{
		$this->config = $config;
		$this->files  = $files;

		$this->storagePath = $this->config->get('codex.storage_path');
	}

	/**
	 * Get manual's table of contents file, if it exists.
	 *
	 * @param  string $version
	 * @return string
	 */
	public function getToc($manual, $version)
	{
		$tocFile = $this->storagePath.'/'.$manual.'/'.$version.'/toc.md';

		if ($this->files->exists($tocFile)) {
			return $this->cached("$manual.$version.toc",
				Markdown::parse($this->files->get($tocFile), $manual.'/'.$version));
		} else {
			return null;
		}
	}

	/**
	 * Get the given documentation page.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $page
	 * @return string
	 */
	public function get($manual, $version, $page)
	{
		$pageFile = $this->storagePath.'/'.$manual.'/'.$version.'/'.$page.'.md';

		if ($this->files->exists($pageFile)) {
			return $this->cached("$manual.$version.$pageFile",
				Markdown::parse($this->files->get($pageFile), $manual.'/'.$version.'/'.dirname($page)));
		} else {
			App::abort(404);
		}
	}

	/**
	 * Search manual for given string.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $needle
	 * @return array
	 */
	public function search($manual, $version, $needle = '')
	{
		$results   = [];
		$directory = $this->storagePath.'/'.$manual.'/'.$version;
		$files     = preg_grep('/toc\.md$/', $this->files->allFiles($directory),
		 	PREG_GREP_INVERT);

		if ( ! empty($needle)) {
			foreach ($files as $file) {
				$haystack = file_get_contents($file);

				if (strpos(strtolower($haystack), strtolower($needle)) !== false) {
					$results[] = [
						'title' => $this->getPageTitle((string)$file),
						'url'   => str_replace([$this->config->get('codex.storage_path'), '.md'], '', (string)$file),
					];
				}
			}
		}

		return $results;
	}

}
