const express = require("express");
const port = 8000;
const cors = require("cors");
const app = express();
app.use(cors());
const dotenv = require("dotenv");
const { analyze } = require('./analize'); 

// Middleware to use
app.use(express.static('dist'));
app.use(express.json()); // Parses JSON bodies
dotenv.config();

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile("index.html", { root: 'dist' });
});

// POST route to analyze URL
app.post('/', async (req, res) => {
    try {
        // 1. Get the URL from the request body and validate it
        const url = req.body.URI;
        console.log(url);
        // Simple URL validation
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        if(!urlPattern.test(url)) {
            return res.status(400).send('Invalid URL');
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
