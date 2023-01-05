import {Box, Link, Typography} from "@mui/material";
import * as React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{bgcolor: "grey"}}>
        <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 2, mb: 2}}>
          {'Copyright © '}
          <Link color="inherit" href="https://lilpop.net/">
            KREDIMEDIA
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </>
  )
}

export default Footer;