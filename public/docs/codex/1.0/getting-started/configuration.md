# Configuration

Codex comes with a custom config file with a few configuration options within the `app/config/codex.php` file.

## Storage Path
By default, Codex stores documentation files within the `public/docs` directory. This can be configured and moved to another location by changing the `storage_path` configuration key.

## Default Manual
By default, Codex scans manuals in alphabetical order. If no manual is supplied within the URI, Codex will simply load the first manual it finds. This can be overwritten by changing the configuration key `default_manual` and defining a manual (folder name).

## Google Analytics
Codex comes with Google Analytic support. To enable Google Analytic tracking, simply create an environment variable with the key of `tracking_code` and Codex will automatically pick up on it. If you do not wish to use an environment variable, you may manually define your tracking code within the configuration file (under the same key of `tracking_code`).
