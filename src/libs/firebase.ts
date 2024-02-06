import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  DocumentData,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

export const handleOnAuthStateChanged = (
  setUser: (user: User | null) => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);
  });
};

export type MessagesType = { id: string; data: DocumentData }[];
export const handleOnSnapshot = (
  setMessages: (messages: MessagesType) => void
) => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
  });
};

export const sendMessage = async (
  newMessage: string,
  user: User,
  setNewMessage: (message: string) => void
) => {
  if (newMessage.length < 1) return;
  await addDoc(collection(db, "messages"), {
    uid: user.uid,
    photoURL: user.photoURL,
    displayName: user.displayName,
    text: newMessage,
    timestamp: serverTimestamp(),
  });
  setNewMessage("");
};

export const signOut = () => auth.signOut();
