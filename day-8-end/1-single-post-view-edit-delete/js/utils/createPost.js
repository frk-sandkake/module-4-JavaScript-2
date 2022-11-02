async function createPost(token, postData, apiPostUrl) {
  const response = await fetch(apiPostUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });
  console.log("post creation response: ", response);
  const jsonResponse = await response.json();
  console.log("jsonResponse: ",jsonResponse)

  if (jsonResponse.id) {
    console.log("CREATE POST SUCCEEDED!!  🥳 🤗🤗");
    return true;
    // location.href = "/index.html";
  } else {
    return "Creating post failed";
  }
}

export {
  createPost
};