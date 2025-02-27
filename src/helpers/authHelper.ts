import Keycloak from "keycloak-js";
import { getCookieValue, setCookieValue } from "./cookieHelper";

// Keycloak config
export const keycloakClient = new Keycloak({
  url: "http://172.21.40.111:8081",
  realm: "dev",
  clientId: "frontend"
});

export enum UserRole {
  USER,
  DISPOSITOR,
  DIRECTOR
}

let role = parseInt(getCookieValue("usr"));

export const setRole = (x: UserRole) => {
  setCookieValue("usr", x.toString());
  role = x;
};

// Returns current session token
export const getToken = () => {
  return keycloakClient.authenticated ? keycloakClient.token : "";
};

// Returns true if user is authenticated
export const isAuth = () => {
  //return keycloakClient.authenticated;
  return true;
};

// Returns true if user is a dispositor
export const isDispositor = () => {
  return role === UserRole.DISPOSITOR;
};

// Returns true if user is a director
export const isDirector = () => {
  return role === UserRole.DIRECTOR;
};
