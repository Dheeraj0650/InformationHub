import firbase from './firebase-config';
const microsoftProvider = new firbase.auth.OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: process.env.REACT_APP_TENANT,
})
export {microsoftProvider};
export const githubProvider = new firbase.auth.GithubAuthProvider();
export const googleProvider = new firbase.auth.GoogleAuthProvider();
