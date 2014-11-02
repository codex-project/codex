<?php

class CodexController extends BaseController
{
	/**
	 * The codex model.
	 *
	 * @var Codex
	 */
	protected $codex;

	/**
	 * The default manual.
	 *
	 * @var string
	 */
	protected $defaultManual;

	/**
	 * The default version.
	 *
	 * @var string
	 */
	protected $defaultVersion;

	/**
	 * The default root url.
	 *
	 * @var string
	 */
	protected $rootUrl;

	/**
	 * Create a new controller instance.
	 *
	 * @param  Codex $codex
	 * @return void
	 */
	public function __construct(Codex $codex)
	{
		$this->codex = $codex;

		$this->defaultManual  = $this->codex->getDefaultManual();
		$this->defaultVersion = $this->codex->getDefaultVersion($this->defaultManual);

		$this->rootUrl = $this->defaultManual.'/'.$this->defaultVersion;
	}

	/**
	 * Show the root documentation page.
	 *
	 * @return Redirect
	 */
	public function index()
	{
		return Redirect::to(url($this->rootUrl));
	}

	/**
	 * Show a documentation page.
	 *
	 * @return Response
	 */
	public function show($manual, $version, $page = 'introduction')
	{
		$toc            = $this->codex->getToc($manual, $version);
		$content        = $this->codex->get($manual, $version, $page);
		$currentManual  = $manual;
		$currentVersion = $version;
		$manuals        = $this->codex->getManuals();
		$versions       = $this->codex->getVersions($manual);

		return View::make('codex.show', compact(
			'toc',
			'content',
			'currentManual',
			'currentVersion',
			'manuals',
			'versions'
		));
	}
}
