const catchErrors = (error, displayError) => {
  let errorMessage;
  if (error.response) {
    // The request was made and server responded with a status code that is not in the range of 2xx
    errorMessage = error.response.data;
    console.error("Error response", errorMessage);

    // For cloudinary image uploads
    if (error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response was received
    errorMessage = error.request;
    console.error("Error request", errorMessage);
  } else {
    // Something else happend in making the request that triggered an error
    errorMsg = error.errorMessage;
    console.error("Error message", errorMessage);
  }

  displayError(errorMessage);
};

export default catchErrors;
