docker run -p 3043:3000/tcp -p 3083:9009/tcp -p 35729:35729/tcp --env CHOKIDAR_USEPOLLING=true -it --rm --name rdf-scheme-editor -v ${PWD}:/usr/src/app:rw -w /usr/src/app node:11 bash
