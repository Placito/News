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

app.post('/analyze', async (req, res) => {
    // 1. GET the url from the request body
    const url = req.body.URI;
    // 2. Fetch Data from API by sending the URL and the key
    const analyzeResult = await analyze(url); 
    const { code, msg, sample } = analyzeResult;
    // Send errors if result was wrong
    if (code == 212) {
        return res.send({ msg: msg, code: code });
    } else if (code == 100) {
        return res.send({ msg: msg, code: code });
    }

    return res.send({ sample: sample, code: code });
});

app.listen(port, () => console.log(`Server is now listening on port ${port}`));
