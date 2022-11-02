// import the LogInUser Function
import { logInUser } from "./js/utils/logInUser";

// INPUTS WE USE ON THE logInUser FUNCTION

// 2. Data we pass to the function, the login user data email and password
const MOK_USER_DATA = {
  email: "jack@noroff.no",
  password: "somePassword@!"
};
// 3. the API URL and it can be empty because we mock the API call
const MOK_API_URL = "";
// 4. mocked response of the API call after clicking log in
const MOK_RESPONSE = {
  "name": "heshheshamhesham1",
  "email": "heshamheshamhesham1@noroff.no",
  "banner": null,
  "avatar": null,
  "accessToken": "edMQFhX-0RXuvNiFPJsQgkZcaUGTyxmb4LgSomeFakeAccessToken"
};

// handle fake jest MOCKED API CALL
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOK_RESPONSE)
}));

// before the test, clear the cache
beforeEach(() => {
  fetch.mockClear();
});

test("log in user with credentials", async () => {
  // use the logInUser function with mocked data
  const response = await logInUser(MOK_USER_DATA, MOK_API_URL);
  // assign the response accessToken to a variable
  const userAccessToken = response.accessToken;
  // check if the returned accessToken id is not undefined
  expect(userAccessToken).not.toBeUndefined();
});