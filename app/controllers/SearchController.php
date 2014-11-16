<?php

class SearchController extends BaseController
{
	/**
	* The codex model.
	*
	* @var CodexRepositoryInterface
	*/
	protected $codex;

	/**
	* Create a new controller instance.
	*
	* @param  CodexRepositoryInterface $codex
	* @return void
	*/
	public function __construct(CodexRepositoryInterface $codex)
	{
		$this->codex = $codex;
		
		parent::__construct();
	}

	public function show($manual, $version)
	{
		$toc            = $this->codex->getToc($manual, $version);
		$search         = Request::get('q');
		$results        = $this->codex->search($manual, $version, $search);
		$currentManual  = $manual;
		$currentVersion = $version;
		$manuals        = $this->codex->getManuals();
		$versions       = $this->codex->getVersions($manual);

		return View::make('search.show', compact(
			'toc',
			'search',
			'results',
			'currentManual',
			'currentVersion',
			'manuals',
			'versions'
		));
	}
}
