//Will delete this file in the future
import { db } from "@/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import {
  IAddCommentData,
  IAddReplyData,
  ICommentData,
  IReplyData,
} from "./type";
import { Tables } from "@/utils/enums";

export const addComment = async (commentData: IAddCommentData) => {
  const commentDocument = await addDoc(collection(db, Tables.comments), {
    userId: commentData.userId,
    userName: commentData.userName,
    userAvatarUrl: commentData.userAvatarUrl ?? null,
    comment: commentData.comment,
    chapterId: commentData.chapterId,
    createdAt: Timestamp.now(),
  });
  return commentDocument;
};

export const addReply = async (commentData: IAddReplyData) => {
  return await addDoc(collection(db, Tables.replies), {
    userId: commentData.userId,
    userName: commentData.userName,
    userAvatarUrl: commentData.userAvatarUrl ?? null,
    chapterId: commentData.chapterId,
    commentId: commentData.commentId,
    reply: commentData.reply,
    createdAt: Timestamp.now(),
  });
};

export const getReplies = async (
  commentId: string,
  _limit?: number
): Promise<IReplyData[]> => {
  const q = query(
    collection(db, Tables.replies),
    where("commentId", "==", commentId),
    orderBy("createdAt", "desc"),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as IReplyData[];
};

export const getComments = async (
  chapterId: string,
  _limit?: number
): Promise<ICommentData[]> => {
  const q = query(
    collection(db, "comments"),
    where("chapterId", "==", chapterId),
    orderBy("createdAt", "desc"),
    limit(_limit || 999)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  })) as ICommentData[];
};
