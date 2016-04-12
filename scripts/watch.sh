#!/bin/sh

mkdir -p build/development/css
mkdir build/development/js

# Watch HTML
node_modules/.bin/jade \
	--no-debug \
	--out build/development \
	--watch \
	src/index.jade &

# Build CSS
./node_modules/.bin/stylus \
	--use nib \
	--out build/development/css/index.css \
	--watch \
	src/components/index.styl &

node_modules/.bin/watchify src/index.js \
	--outfile build/development/js/index.js \
	--standalone INPHO \
	--transform [ babelify --plugins object-assign ] \
	--verbose
