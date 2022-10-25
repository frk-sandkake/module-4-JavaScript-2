import "../style.css";
import { clearStorage } from "./utils/storage";
import createHeaderBar from "./components/createHeaderBar";

createHeaderBar();
const logOutBtn = document.querySelector("#logout-btn");

if (logOutBtn) {
  logOutBtn.addEventListener("click", function () {
    console.log("I am clicked");
    clearStorage();
    window.location.replace("/login.html");
  });
}
