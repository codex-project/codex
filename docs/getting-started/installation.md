/*
title:  Installation
Author: The Codex Project
*/

# Installation
Codex is built on top of Laravel (4.2), so the requirements and installation process will be the same.

## Server Requirements
Codex has a few system requirements:

- PHP >= 5.4
- MCrypt PHP Extension
- JSON PHP Extension
- Composer
- Git

> **Notice:** As of PHP 5.5, some OS distributions may require you to manually install the PHP JSON extension. When using Ubuntu, this can be done via `apt-get install php5-json`.

## Install Composer
Codex utilizes [Composer](http://getcomposer.org) to manage its dependencies. First, download a copy of the `composer.phar` file. Once you have the PHAR archive, you can either keep it in your codex root directory or move it to `usr/local/bin` to use it globally on your system. On Windows, you can use the Composer [Windows Installer](https://getcomposer.org/Composer-Setup.exe).

For more complete and thorough installation instructions for *nix, Mac, and Windows visit the Composer documentation on installation [here](https://getcomposer.org/doc/00-intro.md#system-requirements).

## Download
Once Composer is installed, download the [latest version](https://github.com/caffeinated/codex/archive/master.zip) of Codex and extract its contents into a directory on your server. Next, in the root of your Codex installation, run the `php composer.phar install` (or `composer install`) command to install all of Codex's dependencies. This process requires **Git** to be installed on the server to successfully complete the installation.

## Permissions
Codex may require one set of permissions to be configured: folders within `app/storage` require write access by the web server.

## Pretty URLs

### Apache
Codex ships with a `public/.htaccess` file that is used to allow URLs without `index.php`. If you use Apache to serve your Codex installation, be sure to enable the `mod_rewrite` module.

If the `.htaccess` file that ships with Codex does not work with your Apache installation, try this one:

```
Options +FollowSymLinks
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

### Nginx
On Nginx, the following directive in your site configuration will allow "pretty" URLs:

```
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```