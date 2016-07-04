/*
title:  Working Locally
Author: The Codex Project
*/

# Working Locally
The following are guidelines for the preferred method to working with Codex locally on your machine mainly for contribution purposes, but is also good practice overall.

## Local Installation
Codex is developed from within [Laravel Homestead](http://laravel.com/docs/4.2/homestead) - the official, pre-packaged Vagrant "box" that provides a wonderful development environment without requiring you to install PHP, HHVM, a web server, and any other server software on your local machine.

Once you have (or already have) Homestead installed, follow the steps below to get Codex up and running on your local machine.

1. Clone the Codex repository `git@github.com:caffeinated/codex.git`
2. Add the path to your cloned Codex repository to the `Homestead.yml` file under the `folders` list.
3. Add a site `codex.dev` for your cloned Codex repository to the `Homestead.yml` file under the `sites` list.
4. Run `vagrant provision` in your Homestead folder.
5. Add `127.0.0.1	codex.dev` to your machine's `hosts` file.
5. SSH into your Homestead box to access your Codex installation to run *Artisan* and *Composer* commands when needed.

You can now visit your local installation of Codex by visiting http://codex.dev/!

## Caching
Codex utilizes caching to help speed up page load times. Pages are cached for 5 minutes before being re-created. Caching should not happen if your Codex environment is set to `local`. If testing or caching is somehow enabled on your local machine, you can easily clear your cache for a refresh via Artisan:

```
php artisan cache:clear
```
