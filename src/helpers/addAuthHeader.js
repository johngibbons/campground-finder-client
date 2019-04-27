import { CURRENT_USER_KEY } from "../modules/users";

export default function(headersObj = {}) {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

  if (user && user.token) {
    return { ...headersObj, Authorization: "Bearer " + user.token };
  } else {
    return headersObj;
  }
}
