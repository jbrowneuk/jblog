#!/bin/sh
pushd dist
ln -s ../public/ .
ln -s ../mocks/ .
ln -s ../api/ .
ln -s ../src/htaccess.txt ./.htaccess
popd
