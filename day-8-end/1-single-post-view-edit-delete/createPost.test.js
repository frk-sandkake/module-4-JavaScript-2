// import the createPost Function
import { createPost } from "./js/utils/createPost";

// INPUTS WE USE ON THE createPost FUNCTION

// 1. The token we pass to the function, and it can be empty because we are mocking the API call
const MOK_TOKEN = "";
// 2. Data we pass to the function, the post title and the post description
const MOK_POST_DATA = {
  title: "hello i am the testing title for the post",
  body: "hello i am the testing body of the post"
};
// 3. the API URL and it can be empty because we mock the API call
const MOK_API_URL = "";
// 4. mocked response of the API call after creating a post
const MOK_RESPONSE = {
  id: 232
};

// handle fake jest MOCKED API CALL
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOK_RESPONSE)
}));

// before the test, clear the cache
beforeEach(() => {
  fetch.mockClear();
});

it("create post function", async () => {
  // use the createPost function with mocked data
  const response = await createPost(MOK_TOKEN, MOK_POST_DATA, MOK_API_URL);
  // assign the response id to a variable
  const createdPostId = response.id;
  // check if the returned post id is not undefined
  expect(createdPostId).not.toBeUndefined();
});