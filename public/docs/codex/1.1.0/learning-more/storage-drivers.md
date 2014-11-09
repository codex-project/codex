# Storage Drivers

## Using the Git driver

The Git driver allows use of exposing branches in your repository as versions. For example, suppose your documentation repository has the following branch structure:

```
master
2.0
1.1
1.0
```

You can specify the "git" driver in `codex.php` and Codex will automatically create the versions `master`, `2.0`, `1.1`, and `1.0`.


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
