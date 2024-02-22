// Will delete this file in the future
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Chapter } from "./type";
import { Tables } from "@/utils/enums";

export const getChapters = async (): Promise<Chapter[]> => {
  const querySnapshot = await getDocs(collection(db, Tables.chapters));
  if (!querySnapshot.empty) {
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Chapter)
    );
  } else {
    return [];
  }
};

export const getChapter = async (
  chapterId: string
): Promise<Chapter | null> => {
  const docRef = doc(db, Tables.chapters, chapterId);
  const result = await getDoc(docRef);
  if (result.exists()) {
    return result.data() as Chapter;
  } else {
    return null;
  }
};
