import { getToken } from "./utils/storage";
import { EDIT_POST_URL, GET_POST_BY_ID_URL } from "./settings/api";

const accessToken = getToken();

const editPostForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");
const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");

console.log(editPostForm);
console.log(postTitle);
console.log(postTitleError);
console.log(postDescription);
console.log(postDescriptionError);

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

async function getPostById() {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("response: ", response);
  if (response.status === 200) {
    const data = await response.json();
    console.log("data: ", data);
    const { title, body, created, updated, id } = data;
    console.log(title);
    console.log(body);
    console.log(created);
    console.log(updated);
    console.log(id);
    postTitle.value = title;
    postDescription.value = body;
  } else {
    const err = await response.json();
    throw err.message;
  }
}

getPostById().catch((err) => {
  console.log(err);
});

editPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isPostTitle = false;
  if (postTitle.value.trim().length > 0) {
    postTitleError.classList.add("hidden");
    isPostTitle = true;
  } else {
    postTitleError.classList.remove("hidden");
  }

  let isPostDescription = false;
  if (postDescription.value.trim().length > 0) {
    postDescriptionError.classList.add("hidden");
    isPostDescription = true;
  } else {
    postDescriptionError.classList.remove("hidden");
  }

  let isFormValid = isPostTitle && isPostDescription;

  if (isFormValid) {
    console.log("Validation SUCCEEDED!!  🥳");
    console.log(postTitle.value);
    console.log(postDescription.value);
    const postData = {
      title: postTitle.value,
      body: postDescription.value,
    };
    console.log("postData: ", postData);
    const accessToken = getToken();
    console.log("accessToken: ", accessToken);
    console.log("EDIT_POST_URL", EDIT_POST_URL);

    (async function createPost() {
      const response = await fetch(`${EDIT_POST_URL}/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      console.log("post Edition response: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Edit POST SUCCEEDED!!  🥳 🤗🤗");
        // Redirect to the single post view page
        location.href = `single-post.html?post_id=${postId}`;
      } else {
        const err = await response.json();
        const message = "Editing post failed";
        throw new Error(message);
      }
      editPostForm.reset();
    })().catch((err) => {
      console.log(err);
    });
  } else {
    console.log("Validation FAILED!! 💩");
  }
});
