FROM node:5.10.1

RUN apt-get update 
RUN apt-get dist-upgrade -y

RUN apt-get install -y  --force-yes mongodb

RUN apt-get install -y git
RUN apt-get install -y curl

RUN git clone https://github.com/HuygensING/beverland-design-sprint.git


WORKDIR /beverland-design-sprint

RUN pwd

RUN npm i

RUN mkdir -p build/development/js
RUN mkdir -p build/development/css

RUN ./node_modules/.bin/browserify src/index.js \
	--standalone Beverland \
	--transform [ babelify ] \
	--verbose > build/development/js/index.js

RUN ./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/index.css \
	src/components/index.styl

RUN ./node_modules/.bin/jade \
  --no-debug \
  --out build/development \
  src/index.jade

RUN apt-get install -y python python-dev python-distribute python-pip

RUN pip install pymongo



ENTRYPOINT ./restore.sh 
# && ./csv2mongo.py < STSM-2.csv &&  npm start
