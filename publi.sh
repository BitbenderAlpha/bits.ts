#! /bin/bash -

npm version minor && npm run clean && npm run build && cd build && npm publish