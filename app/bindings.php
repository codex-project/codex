<?php

$storageDriver = ucfirst(Config::get('codex.driver'));

App::bind('CodexRepositoryInterface', 'CodexRepository'.$storageDriver);
