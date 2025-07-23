import { create, style } from "../componentUtilities";
import { getUserId } from "../scripts/funcs";
import { createLogInPopup } from "./logInPopup";
import { createSignUpPopup } from "./signUpPopup";
//
export var createBanner = () => {
  var userId = getUserId();

  var bannerDiv = create("div", { id: "bannerDiv" }, [
    create("div", { id: "barDiv" }, [
      create("div", { id: "titleDiv" }, ["Memora"]),
      create("div", { id: "userDiv" }),
    ]),
  ]);

  var userDiv = bannerDiv.querySelector<HTMLDivElement>("#userDiv")!;

  if (userId == null) {
    var { popup: signUpPopup, show: showSignUpPopup } = createSignUpPopup();
    var { popup: logInPopup, show: showLogInPopup } = createLogInPopup();

    var signUpButton = create("button", {
      id: "signUpBtn",
      className: "barButton",
      onclick: showSignUpPopup,
    }, ["Sign Up"]);

    var logInButton = create("button", {
      id: "logInBtn",
      className: "barButton",
      onclick: showLogInPopup,
    }, ["Log In"]);

    userDiv.append(signUpButton, logInButton);
    bannerDiv.append(signUpPopup, logInPopup);
  } else {
    var logOut = () => {
      localStorage.removeItem("userId");
      window.location.reload();
    };

    var logOutButton = create("button", {
      id: "logOutBtn",
      onclick: logOut,
    }, ["Log Out"]);

    userDiv.appendChild(logOutButton);
  }

  return style(
    "/website/components/banner.css",
    bannerDiv,
  );
};
