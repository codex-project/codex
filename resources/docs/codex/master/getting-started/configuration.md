<!---
title: Configuration
subtitle: Getting started
processors:
    disabled:
        - toc
-->

# Configuration
To get started, you need to configure some things in your Laravel application. 
For further configuration information, check the documentation about it in the menu. 

#### Recommendations
- Configure the Laravel queue service correctly. Ensure queue jobs are actually deferred as intended  
- Codex should not rely on the `file` cache driver. Consider something like `redis`
- While developing addons, enable the development mode


#### Minimal Setup

> If you used the `composer create-project codex/codex` method, you can skip this

##### 1. Add to `config/services.php`

```php
'github' => [
    'driver' => 'github',
    'auth'   => Sebwite\Git\Manager::AUTH_TOKEN,
    'secret' => env('CODEX_GIT_GITHUB_SECRET', ''),
],


'bitbucket' => [
    'driver' => 'bitbucket',
    'auth'   => Sebwite\Git\Manager::AUTH_OAUTH,
    'key'    => env('CODEX_GIT_BITBUCKET_KEY', ''),
    'secret' => env('CODEX_GIT_BITBUCKET_SECRET', ''),
],

'jira' => [
    'host'     => env('JIRA_HOST'),
    'username' => env('JIRA_USERNAME'),
    'password' => env('JIRA_PASSWORD'),
],
```

##### 2. Add to `.env`

```bash
# core
CODEX_DEV_ENABLED=false
CODEX_BASE_ROUTE=
CODEX_DEFAULT_PROJECT=codex

# addon-git
CODEX_GIT_GITHUB_SECRET=
CODEX_GIT_GITHUB_WEBHOOK_SECRET=tester
CODEX_GIT_BITBUCKET_KEY=
CODEX_GIT_BITBUCKET_SECRET=

# addon-auth
CODEX_AUTH_BITBUCKET_ID=
CODEX_AUTH_BITBUCKET_SECRET=
CODEX_AUTH_GITHUB_ID=
CODEX_AUTH_GITHUB_SECRET=

# addon-jira
CODEX_JIRA_USERNAME=
CODEX_JIRA_PASSWORD=
CODEX_JIRA_LOG_LEVEL=
```
