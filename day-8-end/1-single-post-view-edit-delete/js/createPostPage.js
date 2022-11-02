import { getToken } from "./utils/storage";
import { CREATE_POST_URL } from "./settings/api";
import { createPost } from "./utils/createPost";

const createPostForm = document.querySelector("#create-post-form");

const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");

const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");

console.log(createPostForm);
console.log(postTitle);
console.log(postTitleError);
console.log(postDescription);
console.log(postDescriptionError);

createPostForm.addEventListener("submit", function(event) {
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
      body: postDescription.value
    };
    console.log("postData: ", postData);
    const accessToken = getToken();
    console.log("accessToken: ", accessToken);
    console.log("CREATE_POST_URL", CREATE_POST_URL);

    createPost(accessToken, postData, CREATE_POST_URL)
      .then((response) => {
        console.log("my response: ", response);
        createPostForm.reset();
      })
      .catch((err) => {
        console.log(err);
        createPostForm.reset();
      });
  } else {
    console.log("Validation FAILED!! 💩");
  }
});
