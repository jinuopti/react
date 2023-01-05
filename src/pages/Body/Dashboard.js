import {Box, Container, Typography} from "@mui/material";
import {useEffect} from "react";

const Dashboard = (props) => {
  useEffect(() => {
    console.log("Dashboard useEffect userInfo: ", props.userinfo)
  })

  return (
    <>
      <Box flex={1} p={2} sx={{display: {xs: "none", sm: "block"}}}>
        <Typography>
          {JSON.stringify(props.userinfo)}
        </Typography>
      </Box>
      {/*<Container sx={{border: '1px solid'}}>*/}
      {/*  <Typography>*/}
      {/*    {JSON.stringify(props.userinfo)}*/}
      {/*  </Typography>*/}
      {/*</Container>*/}
    </>
  )
}

export default Dashboard;