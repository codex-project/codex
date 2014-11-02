<?php

class SearchController extends BaseController
{
	/**
	* The codex model.
	*
	* @var Codex
	*/
	protected $codex;

	/**
	* Create a new controller instance.
	*
	* @param  Codex $codex
	* @return void
	*/
	public function __construct(Codex $codex)
	{
		$this->codex = $codex;
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
