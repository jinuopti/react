
import {useEffect} from "react";
import * as React from "react";

const { Kakao } = window;

const KakaoButton = ({ onSocial }) => {
    //const jsKey = "269452c2c061a2bece2fd47cbdaabe63";

    // const initKakao = () => {
    //     if (Kakao && !Kakao.isInitialized()) {
    //         Kakao.init(jsKey);
    //         console.log(Kakao.isInitialized());
    //     }
    // };

    useEffect(() => {
        console.log("KakaoButton useEffect: initKakao, ", Kakao.isInitialized())
        //initKakao()
    }, [])

    const kakaoLogin = () => {
        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth/kakao',
        });
        // Kakao.Auth.login({
        //     success() {
        //         Kakao.API.request({
        //             url: "/v2/user/me",
        //             async success(res) {
        //                 alert(JSON.stringify(res));
        //                 const kakaoAccount = res.kakao_account;
        //                 console.log(kakaoAccount);
        //                 await onSocial({
        //                     socialType: 'kakao',
        //                     credential: 'credential',
        //                 })
        //             },
        //             fail(error) {
        //                 console.log(error);
        //             },
        //         });
        //     },
        //     fail(error) {
        //         console.log(error);
        //     },
        // });
    };

    return (
        <>
            <a id="kakao-login-btn" onClick={kakaoLogin}>
                <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
                     alt="카카오 로그인 버튼" />
            </a>
        </>
    )
}

export default KakaoButton;