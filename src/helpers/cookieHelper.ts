// Helper for improved cookie handling
import { getCookieConsentValue } from "../components/CookieConsent";

export const getCookieValue = (key: string) => {
  return localStorage.getItem(key);
};

export const setCookieValue = (key: string, value: string) => {
  if (getCookieConsentValue()) {
    localStorage.setItem(key, value);
  }
};

export const removeCookieValue = (key: string) => {
  localStorage.removeItem(key);
};
