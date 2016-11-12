#!/bin/sh
pushd dist
ln -s ../public/ .
ln -s ../mocks/ .
ln -s ../api/ .
popd
