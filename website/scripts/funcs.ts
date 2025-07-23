import { send } from "../clientUtilities";

export var getUserId = () => {
  var userId = localStorage.getItem("userId");

  var isValid = userId == null
    ? false
    : send<boolean>("validateUserId", userId);

  return isValid ? userId : null;
};
