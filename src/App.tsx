import { useState, useEffect } from "react";
import { User } from "firebase/auth";

import { Chat, LoginWithGoogleButton } from "./components";
import { handleOnAuthStateChanged } from "./libs";

function App() {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    handleOnAuthStateChanged(setUser);
  }, []);

  return <main>{user ? <Chat user={user} /> : <LoginWithGoogleButton />}</main>;
}

export default App;
