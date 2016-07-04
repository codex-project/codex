/*
title:  Storage Drivers
Author: The Codex Project
*/

# Storage Drivers

## Using the Git driver

The Git driver allows use of exposing branches in your repository as versions. For example, suppose your documentation repository has the following branch structure:

```
master
2.0
1.1
1.0
```

You can specify the "git" driver in `app/config/codex.php` and Codex will automatically create the versions `master`, `2.0`, `1.1`, and `1.0`.

Once you have specified the git driver, go into `public/docs` or your configured storage path, and delete all existing documentation.

Next, clone your documentation repository

```
cd public/docs
rm -rf ./*
git clone https://github.com/caffeinated/codex-docs codex
```

Once this is done, you can navigate your browser to your Codex installation and you'll be greeted with all of your git branches available as documentation versions.

> **Notice:** You will need to add the git composer package in order to utilize this storage driver `$ composer require kzykhys/git`

## Creating a custom driver
To create our custom storage driver, we first need to create our custom driver file and implement the `CodexRepositoryInterface` contract. For this example lets say we'll be adding a (ficticious) storage method for **Cloud Mars**, a new cloud service provider on Mars: `app/repositories/CodexRepositoryCloudmars.php`. We then need to implement the `CodexRepositoryInterface` contract. So, our **Cloud Mars** storage driver would look something like this:

```php
class CodexRepositoryCloudmars implements CodexRepositoryInterface
{
	public function getToc($manual, $version) {}
	public function get($manual, $version, $page) {}
	public function getUpdatedTimestamp($manual, $version, $page) {}
	public function getManuals() {}
	public function getVersions($manual) {}
	public function getDefaultManual() {}
	public function getDefaultVersion($manual) {}
	public function search($manual, $version, $needle = '') {}
}
```

We just need to implement each of these methods using **Cloud Mars**' API. Once our implementation is complete, we can then set it as our `storage_driver` option within the Codex config file. In our case of **Cloudmars**, the key for our new driver would be **cloudmars**.

> **Note** that the driver key will always be your driver *slug* in lower case letters.


## Caching
Codex comes with a cache trait (aptly named `CacheTrait`) to add the means to easily cache your rendered content. Simply `use` it within your class, and call on the `cached()` method when returning content.

```php
class CodexRepositoryCloudmars implements CodexRepositoryInterface
{
	use CacheTrait;

	...

	public function get($manual, $version, $page)
	{
		return $this->cached('cache_key', Markdown::parse('path/to/file.md'));
	}

	...
}
```