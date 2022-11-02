import { createPost } from "./js/utils/createPost";
// import the function I want to test

// inputs for the function
// 1. the token we pass to the function

const MOK_TOKEN = "gfnsidgfnsdouynfosvdf";

const MOK_POST_DATA = {
  title: "hello i am the testing title for the post",
  body: "hello i am the testing body of the post"
};

const MOK_API_URL = "helloIamSomeUrl";

const MOK_RESPONSE = {
  id: 232
};

// handle fake jest MOCKED API CALL
//
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOK_RESPONSE)
}));

test("create post function", async () => {
  console.log(MOK_TOKEN);
  console.log(MOK_POST_DATA);
  console.log(MOK_API_URL);

  const response = await createPost(MOK_TOKEN, MOK_POST_DATA, MOK_API_URL);
  console.log(response);
  expect(response).toBeTruthy();
});











