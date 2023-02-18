import { auth, db } from "./firebaseService";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export async function register(email, password, age, income, name) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      if (credential && credential.user) {
        setDoc(doc(db, "users", credential.user.uid), {
          email: email,
          age: age,
          income: income,
          name: name,
        });
      }
    })
    .catch((error) => console.log(error));
  return true;
}
export async function login(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
}
export async function logout() {
  try {
    const response = await auth.signOut();
    return response;
  } catch (error) {
    return error;
  }
}
export function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

