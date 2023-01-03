import {useEffect} from "react";

const uri = window.location.href
const arr = uri.split("=")

const KakaoRedirectUrl = () => {

    useEffect(() => {
        console.log("Uri: ", uri)
        console.log("Arr: ", arr)
    }, [])

    return (
        <>
        </>
    )
}

export default KakaoRedirectUrl;