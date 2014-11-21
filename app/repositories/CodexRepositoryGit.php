<?php

use Illuminate\Config\Repository as Config;
use Illuminate\Cache\Repository as Cache;
use Illuminate\Filesystem\Filesystem;
use PHPGit\Git;

class CodexRepositoryGit extends AbstractCodexRepository
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
	 * Create a new CodexRepositoryGit instance.
	 *
	 * @param Cache      $cache
	 * @param Config     $config
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

		$pageFile = $storagePath.'/'.$page.'.md';

		if ($this->files->exists($pageFile)) {
			return $this->cached("$manual.$version.$page",
				Markdown::parse($this->files->get($pageFile), $manual.'/'.$version.'/'.dirname($page)));
		} else {
			App::abort(404);
		}
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

		return $this->cache->remember("cache.$manual.branches", 10, function() use ($manualDir) {
			$this->git->setRepository($manualDir);
			$this->git->fetch('origin');
			return array_filter(array_map(function($branch) {
				return preg_replace('/[\w]+?\//', '', $branch['name']);
			}, $this->git->branch(['remotes' => true])), function($branch) {
				return $branch !== 'HEAD';
			});
		});
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
				$filePath = $manual.'/'.$version.(string) $file;

				if (strpos(strtolower($haystack), strtolower($needle)) !== false) {
					$results[] = [
						'title' => $this->getPageTitle((string)$file),
						'url'   => str_replace([$directory, '.md'], '', $filePath),
					];
				}
			}
		}

		return $results;
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

		if ( ! file_exists($storagePath)) {
			$this->files->copyDirectory($this->storagePath.'/'.$manual, $storagePath, 0);
			$this->git->setRepository($storagePath);
			$this->git->checkout($version);
		} else {
			$this->cache->remember("$manual.$version.checkout", 10, function() use ($version, $storagePath) {
				$this->git->setRepository($storagePath);
				$this->git->pull('origin', $version);

				return true;
			});
		}

		return $storagePath;
	}
}
