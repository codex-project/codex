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
		// dd(Config::get('codex.storage_path'));
		dd ($this->codex->search($manual, $version, Request::get('q')));
	}
}
