import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase/firebase.config";
// import auth from "../config/firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // state
  const [user, setUser] = useState(null);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [Loading, setLoading] = useState(true);

  // google Provider
  const googleProvider = new GoogleAuthProvider();

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login user
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /// google user login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user
  const updateUserData = (userName, userPhotoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: userPhotoUrl,
    });
  };

  // scroll top
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //   property card animation delay time calculation
  const propertyCardDelay = Array.from({ length: 33 }, () => [
    100, 200, 300,
  ]).flat();

  // user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, presentUser => {
      //   const userEmail = presentUser?.email || user?.email;
      //   const loggedInUser = { email: userEmail };
      //set the user in state
      setUser(presentUser);
      console.log("USER OBSERVED ::>>", presentUser);
      setLoading(false);
      // if user are exist, then execute the code=>
      /* if (presentUser) {
        axios
          .post("https://food-hub-server-hazel.vercel.app/jwt", loggedInUser, {
            withCredentials: true,
          })
          .then(res => {
            console.log("token response:==>", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post(
            "https://food-hub-server-hazel.vercel.app/logout",
            loggedInUser,
            {
              withCredentials: true,
            }
          )
          .then(res => {
            console.log("Log Out::>>", res.data);
          });
      } */
    });
    return () => {
      return unSubscribe();
    };
  }, [profileUpdate, user?.email]);

  const data = {
    user,
    setProfileUpdate,
    profileUpdate,
    setLoading,
    Loading,
    createUser,
    logIn,
    googleLogin,
    updateUserData,
    logOut,
    gooTop: scrollTop,
    propertyCardDelay,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
