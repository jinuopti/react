
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AuthRoutes = () => {
  const navigate = useNavigate()
  let isAuthorized = sessionStorage.getItem("isAuthorized")

  useEffect(() => {
    console.log("isAuthorized: ", isAuthorized)
    if (isAuthorized === null || isAuthorized === undefined || isAuthorized !== '') {
      console.log("init isAuthorized = false")
      isAuthorized = "false"
      sessionStorage.setItem("isAuthorized", isAuthorized)
    }
    if (isAuthorized === "true") {
      console.log("navigate to root")
      navigate("/")
    } else {
      console.log("navigate to /login")
      navigate("/login")
    }
  }, [])

  return (
    <>
    </>
  )
}

export default AuthRoutes;