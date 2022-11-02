// createPost.js

// This file has a function called createPost() which allow us to create a Post using the Noroff API.
// This function require to have inputs token, postData, apiPostUrl (The user must be signedIn in order to have a valid TOKEN)

async function createPost(token, postData, apiPostUrl) { //  parameters are token, the post data, the API end point URL to create post
  const response = await fetch(apiPostUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // passing the token to the Authorization
    },
    body: JSON.stringify(postData) // passing the new post data and converting it to String using JSON.stringify()
  }); // API call to POST a new post data
  const jsonResponse = await response.json(); // Converting the response to JSON
  if (jsonResponse.id) { // Check if we have a post id after the post is created
    // having the id of the created post means that the post is created
    console.log("CREATE POST SUCCEEDED!!  🥳 🤗🤗");
    return jsonResponse; // return the post data
  } else {
    throw Error("Creating post failed"); // // Error message returned if the API call failed
  }
}

export { // Exporting the function to use it anywhere in the project
  createPost
};