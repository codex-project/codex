### Addons
A addon is one or more
- Plugin
- Hook
- Processor

You can access addons with
```php
/** @var \Codex\Addons\Factory $addons */
$addons = codex()->addons;
$addons->getViews();
# or
$addons = \Codex\Addons\Factory::getInstance();
$addons->getViews();
```

#### Plugin
Plugins are used to alter Codex. They are capable of doing something very minor or completely alter the way Codex works. 

- Adding routes/controllers
- Define custom document types
- Adding/changing views
- Adding/chaning assets
- Many more things.
- Extend the Codex API and structure with new features and functionality


#### Processor
Processors are used to alter the output of documents. 
 
- Reading document attributes
- Parsing Markdown/Creole/Anything to HTML
- Adding tooltips
- Inject HTML/Javascript
- Generate table of contents
- Altering links
- Many more things.  


#### Hooks
Hooks are able to execute when Codex executes code which have hook-points defined. This could be seen as a event dispatcher/listener.

- Allows minor or major modifications to Codex its inner workings.
- Codex is full of hook points with getters/setters to adjust class properties.
- Ensures code that doesn't have to be executed, won't be executed.