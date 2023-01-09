import {AppBar, Box, styled, Toolbar, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  })

  const Icons = styled(Box)(({theme}) => ({
      display: "flex",
      alignItems: "center",
      gap: "20px",
    }
  ))

  return (
    <>
      <AppBar position={"sticky"}>
        <StyledToolbar>
          <Typography variant={"h4"}>
            LILPOP
          </Typography>
          <Icons onClick={props.logoutEvent} className="btnLink">
            <LogoutIcon></LogoutIcon>
            <Typography variant={"h6"}>Logout</Typography>
          </Icons>
        </StyledToolbar>
      </AppBar>
    </>
  )
}

export default Header;