const axios = require("axios");

const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";

// Removed the unused 'key' parameter, assuming you always use the environment variable for the API key.
const analyze = async (url) => {
  try {
    const response = await axios.get(`${meaningCloud}`, {
      params: {
        key: process.env.MEAN_CLOUD_API_KEY,
        url: url,
        lang: 'en',
      },
    });

    const { code } = response.data.status;
    return successResponse(response.data, code);
  } catch (error) {
    // Assuming error.response.data exists and has a status field
    const code = error.response?.data.status.code || '500';
    const msg = error.response?.data.status.msg || 'Internal server error';
    return handleError(code, msg);
  }
};

const handleError = (code, msg) => {
  return {
    code: code,
    msg: msg,
  };
};

const successResponse = (data, code) => {
  const { score_tag, agreement, subjectivity, confidence, irony } = data;
  let sample = {
    score_tag,
    agreement,
    subjectivity,
    confidence,
    irony,
  };
  return { sample, status: code };
};

module.exports = {
  analyze,
};