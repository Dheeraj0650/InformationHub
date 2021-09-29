import firebase from './firebase-config';

const socialMediaAuth = (method) => {
  return firebase.auth().signInWithPopup(method)
  .then((res)=>{
    return res.user;
  })
  .catch((er)=>{
    return er;
  })
};

export default socialMediaAuth;
