import {Box, Container, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import {Cloud, ContentCopy, ContentCut, ContentPaste} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {useCallback, useEffect, useState} from "react";
import {Page} from "./Main";

const SideMenu = ({onMenuChange}) => {

  const changeMenu = useCallback(event => {
    console.log("event:", event.currentTarget.id)
    let menu
    switch (event.currentTarget.id) {
      case "user":
        menu = Page.USER
        break
      case "server":
        menu = Page.SERVER
        break
      case "metaverse":
        menu = Page.METAVERSE
        break
      case "admin":
        menu = Page.ADMIN
        break
      default:
        console.log("unknown")
    }
    onMenuChange(menu)
  }, [onMenuChange])

  return (
    <>
      <Box flex={1} p={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position={"fixed"}>
          <List>
            <ListItem>
              <ListItemButton id="user" onClick={changeMenu}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"User"}/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton id="server" onClick={changeMenu}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary={"Server"}/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton id="metaverse" onClick={changeMenu}>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={"Metaverse"}/>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton id="admin" onClick={changeMenu}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Admin"}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}

export default SideMenu;