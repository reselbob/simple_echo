# simple_echo

Runs by default on port `3030` or at the value assigned to `SIMPLE_ECHO_PORT`

## Installation

`npm install`

## Run

`node index.js`


## Packaging the Code up as a Docker Container

`docker build -t receiver .`

`docker run -d -p 3030:3030 --name myreceiver receiver`

## Running the Code against the Container
