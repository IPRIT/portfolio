import { AuthProviders, AuthMethods } from "angularfire2";

export const firebaseConfig = {
  apiKey: "AIzaSyDzXdOj-O_w0TKOIHfwRssvkQPPi_evnno",
  authDomain: "abportfolio-4514e.firebaseapp.com",
  databaseURL: "https://abportfolio-4514e.firebaseio.com",
  projectId: "abportfolio-4514e",
  storageBucket: "abportfolio-4514e.appspot.com",
  messagingSenderId: "766454206227"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};