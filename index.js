// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const appName = 'Simple Echo';

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.SIMPLE_ECHO_PORT || 3030; // set our port

// create our router
const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        res.set ('Content-Type', 'application/json');
        res.status(200);
        const obj = {};
        obj.receivedMethod = 'GET';
        obj.receivedBody = '';
        console.log(JSON.stringify(obj));
        res.send(obj).end();
    })
    .post(async (req, res) => {
        res.set ('Content-Type', 'application/json');
        res.status(201);
        const data = {};
        data.receivedMethod = 'POST';
        data.receivedBody = req.body;
        console.log(JSON.stringify(data));
        res.json(data).end();
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

const server = app.listen(port, () => console.log(`${appName} started at ${new Date()} and listening on port ${port}`));
const shutdown = async (signal) => {
    let shutdownMessage;

    if (!signal) {
        shutdownMessage = (`${appName} shutting down at ${new Date()}`);
    } else {
        shutdownMessage = (`Signal ${signal} : ${appName} service shutting down at ${new Date()}`);
    }
    const obj = {status: "SHUTDOWN", shutdownMessage, pid: process.pid};
    await server.close(() => {
        console.log(obj);
        process.exit(0);
    });
};


process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});

process.on("SIGINT", () => {
    shutdown("SIGINT");
});

module.exports = {server, shutdown};

