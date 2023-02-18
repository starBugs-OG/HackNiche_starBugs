import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseService";

export async function addExpense(expense, userId) {
  // expense is an object
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "expenses"),
      expense
    );
    console.log(docRef);
    return docRef;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getExpense(id) {
  try {
    const docSnap = await getDoc(doc(db, "expenses", id));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}
