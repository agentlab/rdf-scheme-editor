<<<<<<< HEAD
docker run -p 3043:3000/tcp -p 3083:9009/tcp -p 35729:35729/tcp --env CHOKIDAR_USEPOLLING=true -it --rm --name rdf-scheme-editor -v ${PWD}:/usr/src/app:rw -w /usr/src/app node:11 bash
=======
docker run -p 3000:3000/tcp -p 9009:9009/tcp -p 9229:9229/tcp -p 35729:35729/tcp --env CHOKIDAR_USEPOLLING=true -it --rm --name rdf-scheme-editor -v ${PWD}:/usr/src/app:rw -w /usr/src/app -u "node" node:11.9 bash
>>>>>>> 8a8a1a6e792d4858cb188dfce2f98c5ca901f17b
