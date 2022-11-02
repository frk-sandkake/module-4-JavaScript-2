import { USER_LOGIN_URL } from "./settings/api";
import { validateEmail } from "./utils/validation";
import { saveUser, saveToken } from "./utils/storage";
import { logInUser } from "./utils/logInUser";

const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const generalErrorMessage = document.querySelector("#general-error-message");

if (logInForm) { // check if the logInForm is selected using the document.querySelector
  logInForm.addEventListener("submit", function(event) { // listen to the Submit Event on the form when the BTN is clicked
    event.preventDefault(); // Prevent the page from refresh if the Submit BTN clicked

    let isEmail = false; // Boolean Variable to use it to check if the email input field has a value or not.
    if (email.value.trim().length > 0) { // check if the email input value has value inside and NOT empty
      emailError.classList.add("hidden"); // Hide the error message if the email input value has value inside
      isEmail = true; // Now make that boolean variable to be True because now the email value is available
    } else {
      emailError.classList.remove("hidden"); // Show the Error message if the email input is empty and no value is there
    }

    let isValidEmail = false;
    if (email.value.trim().length && validateEmail(email.value) === true) {
      emailErrorNotValid.classList.add("hidden");
      isValidEmail = true;
    } else if (
      email.value.trim().length &&
      validateEmail(email.value) !== true
    ) {
      emailErrorNotValid.classList.remove("hidden");
    }

    let isPassword = false;

    if (password.value.trim().length >= 8) {
      passwordError.classList.add("hidden");
      isPassword = true;
    } else {
      passwordError.classList.remove("hidden");
    }

    let isFormValid = isEmail && isValidEmail && isPassword; // check that the email input has value, email is valid and the password is available.
    // it will return true if all inputs are correct and valid

    if (isFormValid) { // checks if the form inputs are valid
      console.log("Validation SUCCEEDED!!  🥳"); // log if the form inputs are valid
      const userData = { // create and prepare the inputs to send to the logInUser function to login the user.
        email: email.value, // this is the value of the email input
        password: password.value // this is the value of the password input
      };

      const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`; // the URL End point of the login user for the Noroff API
      logInUser(userData, LOGIN_USER_URL_ENDPOINT) // using the logInUser exported function to log in a user, Passing to this function the userData and the login user URL endpoint
        .then((logInUserData) => { // handle the response if the user is successfully logged in
          // save Token in the browser Local Storage
          saveToken(logInUserData.accessToken);
          // save user in the browser Local Storage
          saveUser(logInUserData.userToSave);
          // redirect the user to the home page
          location.href = "/index.html";
        }).catch((errMessage) => { // catch the error message from the Promise
        generalErrorMessage.innerHTML = errMessage; // show the error message on the DOM
      });
    } else {
      console.log("Validation FAILED!! 💩");
    }
  });
}
