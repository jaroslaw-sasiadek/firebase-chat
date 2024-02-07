import { handleGoogleLogin } from "../libs";
import "./LoginWithGoogleButton.css";

interface LoginWithGoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LoginWithGoogleButton = (props: LoginWithGoogleButtonProps) => {
  const { ...other } = props;

  return (
    <button id="login-google" onClick={handleGoogleLogin} {...other}>
      Login with Google
    </button>
  );
};
