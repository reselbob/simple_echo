# Simple Receiver

Runs by default on port `3030` or at the value assigned to `SIMPLE_ECHO_PORT`

## Installation

`npm install`

## Run

`node index.js`


## Packaging the Code up as a Docker Container

`docker build -t receiver .`

`docker run -d -p 3030:3030 --name myreceiver receiver`

## Running the Code against the Container

### GET

`curl localhost:3030`

You'll get the following output:

`{"receivedMethod":"GET","receivedBody":""}`

### POST

`curl -X POST 'http://localhost:3030/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3030' --data '{"firstName":"Cool", "lastName":"McCool", "dob":"1979-01-27", "email":"cool.mccool@reallycool.com", "phone":"123-456-7890"}'`

```$json
{
	"receivedMethod": "POST",
	"receivedBody": {
		"firstName": "Cool",
		"lastName": "McCool",
		"dob": "1979-01-27",
		"email": "cool.mccool@reallycool.com",
		"phone": "123-456-7890"
	}
}

```
