import { create, style } from "../componentUtilities";
import { createPopup } from "./popup";

export var createLogInPopup = () => {
  return createPopup(style(
    "/website/components/logInPopup.css",
    create("div", { id: "titleDiv" }, ["Log In"]),
  ));
};
