<!--
subtitle: Dev
-->
# dev

## config merges
### extensions
Definitions: `codex.document.extensions`
Enabled: `project` -> `extensions`
```ecmascript 6
var getExtensions = () => collect(codex.config('document.extensions')).only(project.config('extensions')).toArray()
```


##