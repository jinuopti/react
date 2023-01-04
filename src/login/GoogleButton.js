import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useEffect} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

const googleClientId = "834577472705-no11i0kmb18ke2dei3386nmmt3s81q6p.apps.googleusercontent.com"

const GoogleButton = ({ onSocial }) => {
  useEffect(() => {
    console.log("GoogleButton useEffect")
  }, [])

  const onSuccess = async(response) => {
    console.log("response: ", response)

    await onSocial({
      socialType: 'google',
      credential: response.credential
    })
  }

  const onError = () => {
    console.log("login failed")
  }

  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleButton;