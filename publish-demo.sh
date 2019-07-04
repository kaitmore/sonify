#!/bin/bash
VERSION=$(node -p -e "require('./package.json').version")

cd ./demo
npm i sonify@"$VERSION"
npm run build
npm run export

cd ../

echo "Publishing to gh pages..."

npm run publish:demo
