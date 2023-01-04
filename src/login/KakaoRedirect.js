import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {LOGIN_URL} from "../configs/Url";

//const { Kakao } = window;

const KakaoRedirectHandler = () => {
    const navigate = useNavigate()
    const [authData, setAuthData] = useLocalStorage("Auth")

    useEffect(() => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code");
        let grant_type = "authorization_code";
        let client_id = "d53cdf809c405924e3997a0729a8ef66";
        let baseUrl = "http://localhost:3000"
        axios
            .post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${baseUrl}/oauth/kakao&code=${code}`,
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            )
            .then((res) => {
                console.log("res: ", res);
                //Kakao.Auth.setAccessToken(res.data.access_token);
                console.log("access_token: ", res.data.access_token)
                //console.log("previous login data: ", authData)
                const req = {
                    "auth_type": "kakao",
                    "access_token": res.data.access_token,
                }
                axios.post(LOGIN_URL, req)
                  .then((response) => {
                      console.log("response: ", response)
                      setAuthData({
                          "authenticated": true,
                          "authType": "kakao",
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

                // Kakao.Auth.getStatusInfo()
                //     .then(function(res) {
                //         if (res.status === 'connected') {
                //             console.log("Success! status info: ", res);
                //         }
                //     })
                //     .catch(function(err) {
                //         Kakao.Auth.setAccessToken(null);
                //     });
            })
            .catch((err) => {
                console.log("Err: ", err)
            });
    }, []);

    return (
        <>
            {navigate("/")}
        </>
    )
};

export default KakaoRedirectHandler;