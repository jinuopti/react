import axios from "axios";
import {LOGIN_URL} from "../configs/Url";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";

const defaultAuthValue = {
  "authenticated": false,
  "authType": "none",
  "authToken": "none",
}

export const LilpopLoginRequest = (authType, accessToken) => {
  const navigate = useNavigate()
  const [authData, setAuthData] = useLocalStorage("Auth", defaultAuthValue)
  const req = {
    "auth_type": authType,
    "access_token": accessToken,
  }

  axios.post(LOGIN_URL, req)
    .then((response) => {
      console.log("response: ", response)
      setAuthData({
        "authenticated": true,
        "authType": "google",
        "authToken": response.data.access_token,
        "id": response.data.id,
        "refreshToken": response.data.refresh_token,
        "nickname": response.data.nickname,
      })
      navigate("/")
    })
    .catch((error) => {
      console.log("error: ", error)
    })
}

const LilpopLogin = () => {
  return (
    <>
      <h1>LILPOP Login</h1>
    </>
  )
}

export default LilpopLogin;