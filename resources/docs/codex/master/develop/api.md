<!--
title: Api
subtitle: Develop
-->

You can access the API by either using the binding, contract or facade.

Check out the [Processors & Hooks](filters-hooks) documentaiton.

### Api access
###### Contract
```php
use Codex\Contracts\Codex;
public function __construct(Codex $codex){
    $dir = $codex->getRootDir();
}
```

###### Facade 
```php
$dir = codex()->getDocsPath();
```

###### Binding
```php
$dir = app('codex')->getDocsPath();
```

### Overview
For details on the specific methods, check the API documentation 
```php
$codex->log($level, $message, $context = [ ]);
$codex->stack($viewName, $data = null, $appendTo = 'codex::layouts.default');

# @var string $path
$path       = $codex->getRootDir();

# @var string $url
$url        = $codex->url($project = null, $ref = null, $doc = null);

# @var boolean $hasProject
$hasProject = $codex->projects->has('codex-core');

/** @var \Codex\Projects\Project $project */ 
$project    = $codex->projects->get('codex-core');

# @var \Codex\Core\Components\Factory\Projects $projects 
$projects   = $codex->projects;

# @var \Codex\Core\Projects[] $projects 
$projects = ->all()
$projects   = $codex->projects->toArray();
foreach($projects as $project){
    $url = $project->url($doc = 'index', $ref = null);
    $project->path($path = null);           # string
    $project->hasEnabledProcessor($filter);    # bool
    $project->hasEnabledHook($hook);        # bool    
    $project->getRef();                     # string
    $project->getDefaultRef();              # string
    $project->getRefs();                    # array[string]
    $project->getSortedRefs();              # array[string]
    $project->getName();                    # string
    $project->getPath();                    # string    
    $project->getBranches();                # array[string]
    $project->getVersions();                # array[string]
        
    $project->documents->setExtensions(['md']);
    $project->documents->has($path); // without extension
    $project->documents->get($path); // without extension
    $documents = $project->documents->all();
}


# @var \Codex\Core\Projects[] $projects 
$documents = $codex->projects->get('codex-core')->documents->all()

# @var \Codex\Core\Projects[] $projects 
$document = $codex->projects->get('codex-core')->documents->get('api-uasge')

$document->render();
$document->attr($key = null, $default = null)
$document->url()
$document->getBreadcrumb()
$document->getPath()
$document->getContent()
$document->setContent($content)
$document->getAttributes((
$document->setAttributes(array $attr = [])
$document->mergeAttributes(array $attr = [])
$document->getProject()
$document->setPath($path)
```