const express = require("express");
const port = 8000;
const cors = require("cors");
const app = express();
app.use(cors());
const dotenv = require("dotenv");
const { analyze } = require('./analize'); 
//middlewares to use
// app.use(express.urlencoded({extended: true}));
app.use(express.static('dist'));
app.use(express.json());
dotenv.config();

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile("index.html", { root: 'dist' }); 
});

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to analyze URL
app.post('/', async (req, res) => {
    try {
        // 1. Get the URL from the request body and validate it
        const url = req.body.URI;
        if (!url) {
            return res.status(400).send({ msg: 'Missing or invalid URL', code: 400 });
        }

        // 2. Fetch data from API by sending the URL and the key
        const analyzeResult = await analyze(url, MEAN_CLOUD_API_KEY);
        const { code, msg, sample } = analyzeResult;

        // 3. Handle specific error codes from the analyze function
        if (code == 212 || code == 100) {
            return res.status(400).send({ msg: msg, code: code });
        }

        // 4. Send success response
        return res.status(200).send({ sample: sample, code: code });
    } catch (error) {
        // 5. Handle unexpected errors
        console.error(error);
        return res.status(500).send({ msg: 'Internal server error', code: 500 });
    }
});

app.listen(port, () => console.log(`Server is now listening on port ${port}`));
