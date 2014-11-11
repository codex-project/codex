<?php

use Illuminate\Config\Repository as Config;
use Illuminate\Cache\Repository as Cache;
use Illuminate\Filesystem\Filesystem;
use PHPGit\Git;

class CodexRepositoryGit implements CodexRepositoryInterface
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
	 * The Git implementation.
	 *
	 * @var Git
	 */
	protected $git;

	/**
	 * Storage path.
	 *
	 * @var string
	 */
	protected $storagePath;

	/**
	 * Create a new codex instance.
	 *
	 * @param Cache $cache
	 * @param Config $config
	 * @param Filesystem $files
	 * @param Git $git
	 */
	public function __construct(Cache $cache, Config $config, Filesystem $files, Git $git)
	{
		$this->cache  = $cache;
		$this->config = $config;
		$this->files  = $files;
		$this->git    = $git;

		$this->storagePath = $this->config->get('codex.storage_path');
	}

	/**
	 * Get the documentation table of contents page.
	 *
	 * @param  string $version
	 * @return string
	 */
	public function getToc($manual, $version)
	{
		$storagePath = $this->getStoragePath($manual, $version);

		$tocFile = $storagePath.'/toc.md';

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
		$storagePath = $this->getStoragePath($manual, $version);

		$page = $storagePath.'/'.$page.'.md';

		if ($this->files->exists($page)) {
			return $this->cached("$manual.$version.$page",
				Markdown::parse($this->files->get($page), $manual.'/'.$version.'/'.dirname($page)));
		} else {
			App::abort(404);
		}
	}

	/**
	 * Gets the given documentation page modification time.
	 *
	 * @param  string $manual
	 * @param  string $version
	 * @param  string $page
	 * @return mixed
	 */
	public function getUpdatedTimestamp($manual, $version, $page)
	{
		$storagePath = $this->getStoragePath($manual, $version);

		$page = $storagePath.'/'.$page.'.md';

		if ($this->files->exists($page)) {
			$timestamp = DateTime::createFromFormat('U', filemtime($page));

			return $timestamp->format($this->config->get('codex.modified_timestamp'));
		} else {
			return false;
		}
	}

	/**
	 * Get all manuals from documentation directory.
	 *
	 * @return array
	 */
	public function getManuals()
	{
		return $this->getDirectories($this->storagePath);
	}

	/**
	 * Get all versions for the given manual.
	 *
	 * @param  string $manual
	 * @return array
	 */
	public function getVersions($manual)
	{
		$manualDir = $this->storagePath.'/'.$manual;
		$this->git->setRepository($manualDir);

		return array_map(function($branch) {
			return $branch['name'];
		}, $this->git->branch());
	}

	/**
	 * Get the default manual.
	 *
	 * @return mixed
	 */
	public function getDefaultManual()
	{
		$manuals = $this->getManuals();

		if (count($manuals) > 1) {
			if ( ! is_null($this->config->get('codex.default_manual'))) {
				return $this->config->get('codex.default_manual');
			} else {
				return strval($manuals[0]);
			}
		} elseif (count($manuals) === 1) {
			return strval($manuals[0]);
		} else {
			return null;
		}
	}

	/**
	 * Get the default version for the given manual.
	 *
	 * @param  string $manual
	 * @return string
	 */
	public function getDefaultVersion($manual)
	{
		$versions = $this->getVersions($manual);

		return strval(max($versions));
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
		$directory = $this->getStoragePath($manual, $version);
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

	/**
	 * Return the first line of the supplied page. This will (or rather should)
	 * always be an <h1> tag.
	 *
	 * @param  string $page
	 * @return string
	 */
	private function getPageTitle($page)
	{
		$file  = fopen($page, 'r');
		$title = fgets($file);

		fclose($file);

		return $title;
	}

	/**
	 * Return an array of folders within the supplied path.
	 *
	 * @param  string $path
	 * @return array
	 */
	private function getDirectories($path)
	{
		if ( ! $this->files->exists($path)) {
			App::abort(404);
		}

		$directories = $this->files->directories($path);
		$folders     = [];

		if (count($directories) > 0) {

		}

		foreach ($directories as $dir) {
			$dir = str_replace('\\', '/', $dir);
			$folder    = explode('/', $dir);
			$folders[] = end($folder);
		}

		return $folders;
	}

	/**
	 * Return the path to the checked out repository for the supplied
	 * manual and version.
	 *
	 * @param string $manual
	 * @param string $version
	 * @return string
	 */
	private function getStoragePath($manual, $version)
	{
		$storagePath = storage_path('codex/'.$manual.'/'.$version);
		if (!file_exists($storagePath)) {
			$this->files->copyDirectory($this->storagePath.'/'.$manual, $storagePath, 0);
			$this->git->setRepository($storagePath);
			$this->git->checkout($version);
		} else {
			$this->cache->remember("$manual.$version.checkout", 10, function() use ($manual, $version, $storagePath) {
				$this->git->setRepository($storagePath);
				$this->git->pull('origin', $version);
			});
		}

		return $storagePath;
	}
}