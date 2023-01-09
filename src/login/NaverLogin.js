import axios from "axios";
import {useEffect} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {LOGIN_URL, SNS_LOGIN_CODE_RUL} from "../configs/Url";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {LilpopLoginRequest} from "./LilpopLogin";

const clientId = "ON8MHOF4wajVpHVqQjDY"
const clientSecret = "zQL0aDAQbh"

const authUrl = "https://nid.naver.com/oauth2.0/authorize"
const tokenUrl = "https://nid.naver.com/oauth2.0/token"
const redirectUrl = "http://localhost:3000/oauth/naver"

let code
let state
let accessToken

const defaultAuthValue = {
  "authenticated": false,
  "authType": "none",
  "authToken": "none",
}

export const NaverRedirectHandler = () => {
  const navigate = useNavigate()
  const [authData, setAuthData] = useLocalStorage("Auth", defaultAuthValue)

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    code = params.get("code");
    state = params.get("state");

    console.log("Naver redirect handler, code:", code, ", state: ", state)

    // axios.get(
    //   tokenUrl + `?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`
    // ).then(res => {
    //   console.log("naver res: ", res)
    //   accessToken = res.data.access_token
    //   LilpopLoginRequest(accessToken)
    // })

    // lilpop 서버로 code, state 전송
    axios.post(
      LOGIN_URL,
      {
        auth_type: "naver",
        code: code,
        state: state,
      }
    ).then(response => {
      console.log("sns login code response: ", response)
      setAuthData({
        "authenticated": true,
        "authType": "google",
        "authToken": response.data.access_token,
        "id": response.data.id,
        "refreshToken": response.data.refresh_token,
        "nickname": response.data.nickname,
      })
      navigate("/")
    }).catch(err => {
      console.log("error: ", err)
    })
  }, [])

  return (
    <>
      {navigate("/")}
    </>
  )
}

const NaverButton = () => {
  useEffect(() => {
    console.log("NaverButton useEffect")
  }, [])

  return (
    <>
      <a href={authUrl+`?response_type=code&client_id=${clientId}&redirect_url=${redirectUrl}&state=lilpop`}>
        <img src="images/btnG_official.png" alt="네이버 로그인" width={"183"} height={"45"}/>
      </a>
    </>
  )
}

export default NaverButton;