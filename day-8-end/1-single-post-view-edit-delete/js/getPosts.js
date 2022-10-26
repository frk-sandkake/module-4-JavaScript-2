import moment from "moment";

import { GET_POSTS_URL } from "./settings/api";
import { getToken } from "./utils/storage";

const postsContainer = document.querySelector("#posts-container");
const postsNotificationMessage = document.querySelector(".posts__notification");
const accessToken = getToken();
console.log("accessToken: ", accessToken);
console.log("GET_POSTS_URL", GET_POSTS_URL);
if (!accessToken) {
  location.href = "/login.html";
}

(async function getAllPosts() {
  const response = await fetch(GET_POSTS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("get all posts response: ", response);
  if (response.ok) {
    const posts = await response.json();
    console.log(posts);
    console.log("GET POSTS SUCCEEDED!!  🥳 🤗🤗");
    let now = moment(new Date()); //today's date
    console.log("posts: ", posts);
    if (!posts.length) {
      postsNotificationMessage.innerHTML = "Sorry no posts currently";
    } else {
      const listOfHtmlPosts = posts
        .map((post) => {
          console.log("post: ", post);
          const postBody = post.body;
          const postTitle = post.title;
          const createdDate = post.created;
          const daysSinceCreated = now.diff(createdDate, "days");

          return `
                <li class="relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                    <div class="flex justify-between space-x-3">
                        <div class="flex-1 min-w-0">
                            <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <p class="text-sm font-medium text-gray-900 truncate capitalize">${postTitle}</p>
                            </a>
                        </div>
                        <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-400 whitespace-nowrap">${daysSinceCreated} d
                            ago
                        </time>
                    </div>
                    <div class="mt-1">
                        <p class="text-sm text-gray-400 line-clamp-2">${postBody}</p>
                    </div>
                </li>
            `;
        })
        .join("");
      // Add Posts to the page
      postsContainer.insertAdjacentHTML("beforeend", listOfHtmlPosts);
    }
  } else {
    const err = await response.json();
    const message = `Sorry some error ${err}`;
    throw new Error(message);
  }
})().catch((err) => {
  console.log("GET POSTS FAILED!!  😥😥😥");
  console.log(err);
  postsNotificationMessage.innerHTML = err;
});
