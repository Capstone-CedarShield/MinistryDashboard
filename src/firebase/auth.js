import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithEmailLink, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./config"; 



export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const useSignInWithEmailLink = async (email) => {
  try {
    await signInWithEmailLink(auth, email, window.location.href);
  } catch (error) {
    console.error("Error signing in with email link:", error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const sendCustomPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getFirebaseToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    throw new Error("No user is logged in");
  } catch (error) {
    console.error("Error getting Firebase token:", error);
    throw error;
  }
};
