import {Box, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import User from "./UserManagement/User";
import {Page} from "../Main";

const Dashboard = (props) => {
  const [ currPage, setCurrPage ] = useState(Page.MAIN)

  useEffect(() => {
    console.log("Dashboard page: ", props.currentPage)
    setCurrPage(props.currentPage)
  }, [props.currentPage])

  const viewPage = () => {
    switch (currPage) {
      case Page.MAIN:
        return <Typography>Dashboard</Typography>
      case Page.USER:
        return <User/>
      case Page.SERVER:
        return <Typography>Server</Typography>
      case Page.METAVERSE:
        return <Typography>Metaverse</Typography>
      case Page.ADMIN:
        return <Typography>Admin</Typography>
      default:
        console.log("unknown")
    }
  }

  return (
    <>
      <Box flex={1} p={2} sx={{display: {xs: "none", sm: "block"}}}>
        {viewPage()}
      </Box>
    </>
  )
}

export default Dashboard;