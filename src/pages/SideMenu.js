import {Box, Container, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import {Cloud, ContentCopy, ContentCut, ContentPaste} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const SideMenu = () => {
  return (
    <>
      <Box flex={1} p={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position={"fixed"}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"User"}/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary={"Server"}/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={"Metaverse"}/>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
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