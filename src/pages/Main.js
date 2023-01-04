import {Navigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";
import axios from "axios";
import {useEffect} from "react";
import {USERINFO_URL} from "../configs/Url";

const Main = () => {
  const defaultAuthValue = {
    "authenticated": false,
    "authType": "none",
    "authToken": "none",
  }
  const [authData, setAuthData] = useLocalStorage("Auth", defaultAuthValue)
  const [userInfo, setUserInfo] = useLocalStorage("UserInfo")

  const getUserInfo = () => {
    axios.get(USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${authData.authToken}`
      },
      params: {
        id: authData.id,
      },
    })
      .then((response) => {
        console.log("UserInfo response: ", response)
        setUserInfo(response.data)
      })
      .catch((error) => {
        console.log("error: ", error)
      })
  }

  const verifyToken = () => {
    const verifyTokenUrl = "https://dev.lilpop.kr/api/v1/auth/token"
    const req = {
      id: authData.id,
      grant_type: "validation",
      access_token: authData.authToken,
    }
    axios.post(verifyTokenUrl, req)
      .then((response) => {
        console.log("VerifyToken response: ", response)
        if (response.data.code !== 0) {
          console.log("error! msg: ", response.data.message)
          setAuthData({authenticated: false})
        } else {
          console.log("success token validation")
          getUserInfo()
        }
      })
      .catch((error) => {
        console.log("error: ", error)
        setAuthData({authenticated: false})
        setUserInfo({})
      })
  }

  const logoutEvent = (e) => {
    e.preventDefault()
    console.log("Logout!")
    setAuthData({authenticated: false})
    setUserInfo({})
  }

  useEffect(() => {
    if (authData.authenticated) {
      console.log("Already Logged, AuthData: ", authData)
      // Verify token
      verifyToken()
    }
  }, [])

  if (!authData.authenticated) {
    // Redirect
    return <Navigate replace to={"/login"}/>
  } else {
    return (
      <>
        <h1>Main Page</h1>
        <p>
          <button onClick={logoutEvent}>Logout</button>
        </p>
      </>
    )
  }
}

export default Main;