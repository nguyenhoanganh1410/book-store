import { db } from "@/firebase";
import {
  DocumentData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { UserData } from "./type";
import { Tables } from "@/utils/enums";

export const getUser = async (userID: string): Promise<DocumentData | null> => {
  const docRef = doc(db, "users", userID);
  const result = await getDoc(docRef);
  if (result.exists()) {
    return result.data();
  } else {
    return null;
  }
};

export const addUser = async (user: UserData) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const userRef = doc(db, Tables.users, userId);
  return await updateDoc(userRef, userData);
};
