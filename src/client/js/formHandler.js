import axios from 'axios';
import { validateURL } from './checkURL';

// Elements
const erro = document.getElementById("erro");
const agreement = document.getElementById('agreement');
const subjectivity = document.getElementById('subjectivity');
const confidence = document.getElementById('confidence');
const irony = document.getElementById('irony');
const score_tag = document.getElementById('score_tag');
const results = document.getElementById('results');

// Initialize display settings
document.addEventListener("DOMContentLoaded", () => {
    erro.style.display = "none";
    results.style.display = "none";
});

// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const URI = document.getElementById('URI'); // Move this inside the function to get the current value
    const url = URI.value; // Get the current URL from the input

    if (!validateURL(url)) {
        show_error("Please, enter a valid URL.");
        return;
    }

    // Send the data as JSON to the server using Axios
    axios.post('/', { URI: url })
    .then(response => {
        console.log('Success:', response.data);
        show_results(response.data); // Use response.data to access the returned data
    })
    .catch(error => {
        // Axios encapsulates the error response in error.response
        const message = error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "An error occurred while processing your request.";
        show_error(message);
        console.error(error);
    });
}


// Display error messages
const show_error = (msg) => {
    erro.style.display = "block";
    results.style.display = "none";
    erro.textContent = msg; // Use textContent for better security
}

// Display result data
const show_results = (data) => {
    results.style.display = "block";
    agreement.innerHTML = `Agreement: ${data.sample.agreement}`;
    subjectivity.innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    confidence.innerHTML = `Confidence: ${data.sample.confidence}`;
    irony.innerHTML = `Irony: ${data.sample.irony}`;
    score_tag.innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

export { handleSubmit };
