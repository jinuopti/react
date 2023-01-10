import {Navigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";
import axios from "axios";
import {useEffect, useState} from "react";
import {USERINFO_URL, VERIFY_TOKEN_URL} from "../configs/Url";
import Header from "./Header";
import Footer from "./Footer";
import {Box, Container, Grid, Stack} from "@mui/material";
import SideMenu from "./SideMenu";
import Dashboard from "./Body/Dashboard";
import {KakaoLogout, KakaoLogoutWithRedirect} from "../login/KakaoButton";

const {Kakao} = window;

export const Page = {
  MAIN: "main",
  USER: "user",
  SERVER: "server",
  METAVERSE: "metaverse",
  ADMIN: "admin",
}

const Main = () => {
  const defaultAuthValue = {
    "authenticated": false,
    "authType": "none",
    "authToken": "none",
  }
  const [authData, setAuthData] = useLocalStorage("Auth", defaultAuthValue)
  const [userInfo, setUserInfo] = useLocalStorage("UserInfo")
  const [user, setUser] = useState({})
  const [isVerifyToken, setIsVerifyToken] = useState(false)
  const [isWebsocketConnected, setIsWebSocketConnected] = useState(false)
  const [ currPage, setCurrPage ] = useState(Page.MAIN)

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
        const u = JSON.stringify(response.data)
        setUser(response.data)
        console.log("User state: ", user)
      })
      .catch((error) => {
        console.log("error: ", error)
      })
  }

  const verifyToken = () => {
    const req = {
      id: authData.id,
      grant_type: "validation",
      access_token: authData.authToken,
    }
    axios.post(VERIFY_TOKEN_URL, req)
      .then((response) => {
        console.log("VerifyToken response: ", response)
        if (response.data.code !== 0) {
          console.log("error! msg: ", response.data.message)
          setAuthData({authenticated: false})
        } else {
          setIsVerifyToken(true)
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
    if (authData.authType === "kakao") {
      KakaoLogout()
      //KakaoLogoutWithRedirect()
    }
  }

  useEffect(() => {
    if (authData.authenticated && !isVerifyToken) {
      console.log("Already Logged, AuthData: ", authData)
      // Verify token
      verifyToken()
    }
    if (!isWebsocketConnected) {
      console.log("websocket connect")
    }
    console.log("useEffect User state: ", user)
  }, [user])

  if (!authData.authenticated) {
    // Redirect
    return <Navigate replace to={"/login"}/>
  } else {
    return (
      <>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Header logoutEvent={logoutEvent}/>
          <Stack direction={"row"} spacing={2} justifyContent={"start"}>
            <Grid container>
              <Grid item xs={2}>
                <SideMenu onMenuChange={setCurrPage}/>
              </Grid>
              <Grid item xs>
                <Dashboard currentPage={currPage}/>
              </Grid>
            </Grid>
          </Stack>
          {/*<Footer />*/}
        </Box>
      </>
    )
  }
}

export default Main;