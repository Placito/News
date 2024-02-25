import axios from 'axios';
import { validateURL } from './checkURL';

// check what text was put into the form field
const input = document.getElementById('URI');
const erro = document.getElementById("erro");
const agreement = document.getElementById('agreement');
const subjectivity = document.getElementById('subjectivity');
const confidence = document.getElementById('confidence');
const irony = document.getElementById('irony');
const score_tag = document.getElementById('score_tag');
const results = document.getElementById('results');

document.addEventListener("DOMContentLoaded", () => {
    erro.style.display = "none";
    results.style.display = "none";
})

const handleSubmit = async (event) => {
  event.preventDefault();
    if (!validateURL(input.value)) {
        show_error("Please, enter a valid URL.");
        return;
    }

  try {
      const response = await axios.post('/', input.value );
      console.log(response)

      if (response.status && response.status.code !== '0') {
          show_error(response.status.msg);
          return;
      }

      show_results(response);
  } catch (error) {
      show_error("An error occurred while processing your request.");
      console.error(error);
  }
};
const show_error = (msg) => {
    erro.style.display = "block";
    results.style.display = "none";
    erro.innerHTML = msg;
}

const show_results = (sample) => {
    results.style.display = "block";
    agreement.innerHTML = `Agreement: ${sample.agreement}`;
    subjectivity.innerHTML = `Subjectivity: ${sample.subjectivity}`;
    confidence.innerHTML = `Confidence: ${sample.confidence}`;
    irony.innerHTML = `Irony: ${sample.irony}`;
    score_tag.innerHTML = `Score Tag: ${sample.score_tag}`;
}
export { handleSubmit }