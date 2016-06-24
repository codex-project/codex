#!/bin/bash

rm boostrap/cache/*.php
rm -rf vendor
rm composer.lock
composer install