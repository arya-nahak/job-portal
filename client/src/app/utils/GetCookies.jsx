import Cookies from "js-cookie";

Cookies.set("authUser",JSON.stringify({type:"recruiter"}),1)

export const isAuthentication = () => {
  let _parse = Cookies.get("authUser") && JSON.parse(Cookies.get("authUser"));
  return _parse;
  //   return "hello world";
};

export const isUser = () => {
  let _parse =
    Cookies.get("authUser") && JSON.parse(Cookies.get("authUser")).type;
  return _parse;
};
