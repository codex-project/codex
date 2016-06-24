<!--
title: Parser
subtitle: Processors
-->

# Parser

### Overview

**API Documentation:** [ParserProcessor](#phpdoc:popover:Codex\Processors\MarkdownProcessor)

This filter is responsible for transformations between different semantic markup languages into HTML. (Like Markdown, ReStructured text, Docbook, etc).
 
Currently only Markdown is implemented by default. Creating your own implementation is easy. More on that in the 

### Configuration
Below is the default configuration. This goes into your `docs/{project-name}/config.php`
```php
[
    'processors' => [
        'enabled' => ['parser'],
        'parser' => [        
            'parser'  => 'Codex\Processors\Parser\MarkdownParser',
            'markdown'     => [
                'renderer' => 'Codex\Processors\Parser\Markdown\CodexMarkdownRenderer',
            ],
        ]
    ]
];
```    

#### filters.parser
The configuration for the `parser` filter.


#### filters.parser.parser
A class that implements the [`ParserInterface`](#phpdoc:popover:Codex\Processors\Parser\ParserInterface). 
Performs the the actual parsing. Has 3 methods that should be implemented:

- [`ParserInterface::parse($text)`](#phpdoc:popover:Codex\Processors\Parser\ParserInterface::parse)
- [`ParserInterface::getName()`](#phpdoc:popover:Codex\Processors\Parser\ParserInterface::getName)
- [`ParserInterface::setConfig(array $config = [])`](#phpdoc:popover:Codex\Processors\Parser\ParserInterface::setConfig)


#### filters.parser.{name}
The (optional) configuration that will be send to the `filters.parser.parser` class by calling [`ParserInterface::setConfig(array $config = [])`](#phpdoc:popover:Codex\Processors\Parser\ParserInterface::setConfig).
This configuration is different for each `parser`. 


### Use custom markdown renderer
It is possible to change the default `renderer` to a custom implementation. For example, if you'd rather have `Parsedown` 
handle the Markdown > HTML transformation, you can use the [`RendererInterface`](#phpdoc:popover:Codex\Processors\Markdown\RendererInterface)
to implement it and then configure by setting the `renderer` option value to that custom class.
```php
[
    'filters' => [
        'enabled' => ['parser'],
        'parser' => [          
            'parser'  => 'Codex\Processors\Parser\MarkdownParser',
            'markdown'     => [
                'renderer' => 'App\Markdown\ParsedownRenderer',
                'markup_escaped' => true,
            ]
        ]
    ]
];    
```    

This requires you to create your own Renderer. Which is easy to create:

```php
namespace App\Markdown;

use Codex\Processors\Parser\Markdown\RendererInterface;

class ParsedownRenderer implements RendererInterface {

    protected $config = ['markup_escaped' => false];
    
    public function getName(){
        return 'parsedown';
    }
    
    public function render($string){
        $parsedown = new \Parsedown();
        $parsedown->setMarkupEscaped($this->config['markup_escaped']);
        return $parsedown->text($string);
    }

    public function setConfig($config = [ ]){
        $this->config = array_replace_recursive($this->config, $config);
    }
}
```