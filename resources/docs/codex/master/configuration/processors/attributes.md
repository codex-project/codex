<!--
title: Attributes
subtitle: Processors
-->

# Attributes



### Overview

**API Documentation:** [Attributes](#phpdoc:popover:Codex\Processors\AttributesProcessor)

The attributes filter will parse and remove the attributes that can be defined each document. You can define 
attributes in any kind of document by specifying it on top. By default it accepts FrontMatter and HTMLDocBlock style definitions.



```markdown
<!--
title: Attributes
subtitle: Processors
author: Robin Radic
-->
The attributes filter will parse and remove the attributes that can be defined each document. You can define 
attributes in any kind of document by specifying it on top. By default it accepts FrontMatter and HTMLDocBlock style definitions.
```


Or if you'd rather use FrontMatter:

```markdown
---
title: Attributes
subtitle: Processors
author: Robin Radic
---
The attributes filter will parse and remove the attributes that can be defined each document. You can define 
attributes in any kind of document by specifying it on top. By default it accepts FrontMatter and HTMLDocBlock style definitions.
```

### Configuration

> This processor does not have to be enabled. It is **always** enabled and the **first** to run.

Below is the default project configuration.
```php
[
    'filters' => [
        'enabled' => ['attributes'], // can omit or keep for clarification
        'attributes' => [            
            'tags'    => [
                [ 'open' => '<!--*', 'close' => '--*>' ],   // HTMLDocBlock
                [ 'open' => '---', 'close' => '---' ],      // FrontMatter
            ],
            'remove_tags' => true,
            'add_extra_data' => true
        ]            
    ]        
];
```

