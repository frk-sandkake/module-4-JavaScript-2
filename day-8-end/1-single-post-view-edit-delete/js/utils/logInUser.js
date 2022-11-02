// this is a function to log In the user, and it takes two parameters. the user data and the URL end point to log in a user
async function logInUser(userData, LOGIN_USER_URL_ENDPOINT) {
  // Make an async await fetch API call to the end point
  const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
    method: "POST", // this is the API call type
    headers: { // this is the header we need to send to the API
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData) // the user data needed to be sent to the API
  });

  const jsonResponse = await response.json(); // convert the Response to JSON data

  if (jsonResponse.accessToken) { // check if the accessToken is available in the API JSON response or not
    // if accessToken is available from the response
    // this means that logging in the user is SUCCEEDED 🥳🥳
    console.log(jsonResponse); // logging the JSON response data to See on the console on the browser //TODO delete this console log
    console.log(jsonResponse.accessToken); // logging the accessToken to See on the console on the browser //TODO delete this console log
    console.log("POST REQUEST LOGIN SUCCEEDED!!  🥳 🤗🤗"); //TODO delete this console log
    // create user object has the logged-in user name and email to return
    const userToSave = {
      name: jsonResponse.name,
      email: jsonResponse.email
    };
    // create and prepare the whole login user data including the access token to return from the function
    const logInUserData = {
      userToSave,
      accessToken: jsonResponse.accessToken
    };
    return logInUserData; // return the login user data with token from the promise
  } else {
    // if an error happened then we are going to get an error message in the jsonResponse
    console.log(jsonResponse);
    const errMessage = `An error occurred: ${jsonResponse.errors[0].message}`; // create an error message
    console.log("POST REQUEST LOGIN Failed!!  💩"); // log a custom error message //TODO delete this console log
    throw Error(errMessage); // return an error message
  }
}

export { logInUser }; // export the logInUser function