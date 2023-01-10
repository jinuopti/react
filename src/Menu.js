import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useCallback, useState} from "react";
import {Page} from "./pages/Main";

const ListItemBody = ({config}) => {
  return (<>
    <ListItemIcon>{config.icon}</ListItemIcon>
    <ListItemText primary={config.title} />
  </>);
}

const MenuItem = ({ config, onChange }) => {
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
        return
    }
    onChange(menu)
  }, [onChange])

  const handleMenuClick = (event) => {
    event.preventDefault()
    console.log("event: ", event.currentTarget.id)
  }

  return (
    <ListItemButton id={config.id} onClick={changeMenu}>
      <ListItemBody config={config}/>
    </ListItemButton>
  );
};

const ExpandableMenuItem = ({ config }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemBody config={config}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Menu items={config.items} />
      </Collapse>
    </div>
  );
};

export default function Menu({ items, onMenuChange }) {
  const createList = (items) => {
    let menu = [];
    items.map((menuItem) => {
      if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
        menu.push(<ExpandableMenuItem
          config={menuItem}
          key={menuItem.title}
        />);
      } else {
        menu.push(<MenuItem
          config={menuItem}
          key={menuItem.title}
          onChange={onMenuChange}
        />);
      }
    });
    return menu.concat();
  };

  return <List>{createList(items)}</List>;
}