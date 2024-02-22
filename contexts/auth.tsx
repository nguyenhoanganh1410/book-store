import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  signOut,
  User,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
  confirmPasswordReset,
  FacebookAuthProvider,
  getAuth,
  updateEmail,
} from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { Chapter, ISignUpFormValues, UserData } from '@/queries/type';
import { addUser, getUser, updateUser } from '@/queries/users';
import {
  getItemLocalStorage,
  removeAllLocalStorage,
  showErrorMessageFirebase,
  toastError,
  toastSuccess,
} from '@/utils';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';

interface AuthContextProps {
  loginWithEmail: (email: string, password: string) => void;
  setIsSignedUp: (value: boolean) => void;
  logout: () => void;
  fetchProfile: () => void;
  signUpWithEmail: (values: ISignUpFormValues) => void;
  setLoading: (loading: boolean) => void;
  sendForgotPassword: (email: string) => void;
  onUpdatePassword: (currentPassword: string, newPassword: string) => void;
  onSetProfile: (user: UserData | null) => void;
  setChapters: (chapters: Chapter[]) => void;
  loginWithGoogle: () => void;
  resetPassword: (oobCode: string, newPassword: string) => void;
  loginFacebook: () => void;
  handleUpdateEmail: (email: string) => void;
  user: User | null;
  profile: UserData | null;
  isSignedUp: boolean;
  loadingInitial: boolean;
  loading: boolean;
  isLogout: boolean;
  chapters: Chapter[];
}

const initialState: AuthContextProps = {
  setIsSignedUp: (value: boolean) => {},
  logout: () => {},
  fetchProfile: () => {},
  loginWithEmail: (email: string, password: string) => {},
  signUpWithEmail: (values: ISignUpFormValues) => {},
  setLoading: (loading: boolean) => {},
  sendForgotPassword: (email: string) => {},
  onUpdatePassword: (currentPassword: string, newPassword: string) => {},
  onSetProfile: (user: UserData | null) => {},
  setChapters: (chapters: Chapter[]) => {},
  loginWithGoogle: () => {},
  resetPassword: (oobCode: string, newPassword: string) => {},
  loginFacebook: () => {},
  handleUpdateEmail: (email: string) => {},
  user: null,
  profile: null,
  isSignedUp: false,
  loadingInitial: true,
  loading: false,
  isLogout: false,
  chapters: [],
};

const AuthContext = createContext<AuthContextProps>(initialState);
interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const checkRememberMe = async () => {
      const isRememberMe = getItemLocalStorage(LOCAL_STORAGE_KEYS.rememberMe);
      const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          try {
            const userData = (await getUser(authUser.uid)) as UserData;
            if (userData) {
              setProfile(userData);
              setIsSignedUp(true);
              setIsLogout(false);
            } else {
              setIsSignedUp(false);
            }
            setUser(authUser);
          } catch (error) {
            console.log('__ ERROR in getUser function in Auth Context __');
          } finally {
            setLoadingInitial(false);
          }
        } else {
          setUser(null);
          setLoadingInitial(false);
        }
      });
      return () => unsubscribe();
    };
    checkRememberMe();
  }, [router]);

  useEffect(() => {
    if (profile?.uid) {
      try {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', profile.uid)
        );
        const usersListner = onSnapshot(q, (querySnapshot) => {
          let data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          //@ts-ignore
          data.length > 0 && setProfile(data[0]);
        });
        return () => usersListner();
      } catch (e) {
        console.log('----------ERROR IN USER CONTEXT----------');
      }
    }
  }, [profile?.uid]);

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          showErrorMessageFirebase(error);
          return;
        }
        //@ts-ignore
        toastError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetPassword = async (oobCode: string, newPassword: string) => {
    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toastSuccess('Updated password successfully!!');
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        showErrorMessageFirebase(error);
        return;
      }
      //@ts-ignore
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = useCallback(async (values: ISignUpFormValues) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        const userData: UserData = {
          uid: user.uid,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        };
        await addUser(userData);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('error: ', error);
        showErrorMessageFirebase(error);
        return;
      }
      //@ts-ignore
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    // @ts-ignore
    await getUser(user?.uid)
      .then((userInfos) => {
        if (userInfos) {
          // @ts-ignore
          setProfile(userInfos);
          setIsSignedUp(true);
        } else {
          setIsSignedUp(false);
        }
      })
      .catch((e) => {
        console.log('__ ERROR in fetch profile function in Auth Context __');
        console.log(e);
      })
      .finally(() => setLoadingInitial(false));
  };

  const logout = useCallback(async () => {
    setIsLogout(true);
    setLoading(true);
    signOut(auth)
      .catch((error) => console.log('Error', `Error: ${error.message}`))
      .finally(() => {
        setLoading(false);
        setLoadingInitial(false);
        setIsSignedUp(false);
        setProfile(null);
        setUser(null);
        removeAllLocalStorage();
      });
  }, []);

  const sendForgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toastSuccess(
        'Sent a request success. Please check your email to reset password!!'
      );
    } catch (error) {
      //@ts-ignore
      console.log('Error', `Error: ${error.message}`);
      //@ts-ignore
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onUpdatePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      const emailCredential = await EmailAuthProvider.credential(
        profile?.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user!, emailCredential);
      await updatePassword(auth.currentUser!, newPassword);
    },
    [user, profile]
  );

  const onSetProfile = useCallback((user: UserData | null) => {
    setProfile(user);
  }, []);

  const checkIfUserHasAccount = useCallback(async (userId: string) => {
    const user = await getUser(userId);
    if (user) return true;
    return false;
  }, []);

  const loginWithGoogle = useCallback(() => {
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        setLoading(true);
        try {
          let doesUserHaveAccount = await checkIfUserHasAccount(user.uid);
          if (!doesUserHaveAccount) {
            const userData: UserData = {
              uid: user.uid,
              email: user.email!,
              firstName: user.displayName!,
              lastName: '',
            };
            await addUser(userData);
            setProfile(userData);
            setIsSignedUp(true);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          console.log('error: ', error);
          showErrorMessageFirebase(error);
          return;
        }
        setLoading(false);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loginFacebook = useCallback(() => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setLoading(true);
        const user = result.user;
        try {
          let doesUserHaveAccount = await checkIfUserHasAccount(user.uid);
          if (!doesUserHaveAccount) {
            const userData: UserData = {
              uid: user.uid,
              email: user.email!,
              firstName: user.displayName!,
              lastName: '',
            };
            await addUser(userData);
            setProfile(userData);
            setIsSignedUp(true);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          console.log('error: ', error);
          showErrorMessageFirebase(error);
          return;
        }
        setLoading(false);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpdateEmail = useCallback((email: string) => {
    const auth = getAuth();
    updateEmail(auth.currentUser as any, email).then(() => {
      console.log('update');
      
    }).catch((error) => {
      console.error(error)
    });
  }, [])

  const memoedValue = {
    user,
    profile,
    loadingInitial,
    loading,
    isSignedUp,
    isLogout,
    chapters,
    logout,
    setIsSignedUp,
    fetchProfile,
    loginWithEmail,
    signUpWithEmail,
    setLoading,
    sendForgotPassword,
    onUpdatePassword,
    onSetProfile,
    setChapters,
    loginWithGoogle,
    resetPassword,
    loginFacebook,
    handleUpdateEmail,
  };

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthState() {
  return useContext(AuthContext);
}
