#!/bin/bash
docker run -p 3000:3000/tcp -p 9009:9009/tcp -p 9229:9229/tcp -it --rm --name rdf-scheme-editor -v "$PWD":/usr/src/app -w /usr/src/app -u "node" node:11.9 bash
