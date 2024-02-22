// Will delete this file in the future
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { Chapter } from "@/queries/type";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Tables } from "@/utils/enums";
import { useAuthState } from "@/contexts/auth";

interface ChapterContextProps {
  chapters: Chapter[];
}

const initialState: ChapterContextProps = {
  chapters: [],
};
const ChapterContext = createContext<ChapterContextProps>(initialState);

interface Props {
  children: ReactNode;
}

export default function ChapterProvider({ children }: Props) {
  const { user } = useAuthState();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const getChapters = useCallback(() => {
    try {
      const q = query(
        collection(db, Tables.chapters),
        orderBy("indexChapter", "asc")
      );
      const clientsListner = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Chapter[];
        setChapters(data);
      });
      return () => clientsListner();
    } catch (e) {
      console.log("----------ERROR IN CHAPTERS CONTEXT----------");
    }
  }, []);

  useEffect(() => {
    getChapters();
  }, [user]);

  const memoedValue = {
    chapters,
  };

  return (
    <ChapterContext.Provider value={memoedValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapterState() {
  return useContext(ChapterContext);
}
