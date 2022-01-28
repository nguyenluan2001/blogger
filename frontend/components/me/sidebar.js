import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Icon } from '@iconify/react';
import pencilIcon from '@iconify/icons-mdi/pencil';
import lockIcon from '@iconify/icons-mdi/lock';
import lockOpen from '@iconify/icons-mdi/lock-open';
import earthIcon from '@iconify/icons-mdi/earth';
import chevronUp from '@iconify/icons-mdi/chevron-up';
import chevronDown from '@iconify/icons-mdi/chevron-down';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'redux/slices/postManagement';
const defaultActiveSidebarItem = {
  draft: false,
  public: false,
  anyone: false
}
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState(defaultActiveSidebarItem)
  const postManagement = useSelector((state) => state.postManagement);
  const dispatch = useDispatch();
  console.log("activeSidebarItem", activeSidebarItem)
  const router = useRouter();
  useEffect(() => {
    const path = router.asPath;
    if (path.startsWith("/me/posts")) {
      const lastItem = path.split("/").splice(-1)[0]
      if (lastItem === "draft") {
        setActiveSidebarItem({
            ...defaultActiveSidebarItem,
            draft: true
        })
      }
      else if (lastItem === "public") {
        setActiveSidebarItem({
          ...defaultActiveSidebarItem,
          public: true
      })
      }
      if (lastItem === "anyone") {
        setActiveSidebarItem({
          ...defaultActiveSidebarItem,
          anyone: true
      })
      }
    }
  }, [router])
  useEffect(() => {
    dispatch(fetchPosts());
  }, [])
  console.log("router", router);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#f5f7fa' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {/* <InboxIcon /> */}
          <Icon icon={pencilIcon}></Icon>
        </ListItemIcon>
        <ListItemText primary={`Posts (${postManagement?.totalPosts})`}/>
        {open ? <Icon icon={chevronUp} /> : <Icon icon={chevronDown}></Icon>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} selected={activeSidebarItem.draft} onClick={() => router.push("/me/posts/draft")}>
            <ListItemIcon >
              <Icon icon={lockIcon}></Icon>
            </ListItemIcon>
            <ListItemText primary={`Draft (${postManagement?.draftPosts?.length})`} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} selected={activeSidebarItem.public} onClick={() => router.push("/me/posts/public")}>
            <ListItemIcon>
              <Icon icon={earthIcon}></Icon>
            </ListItemIcon>
            <ListItemText primary={`Public (${postManagement?.publicPosts?.length})`} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Icon icon={lockOpen}></Icon>
            </ListItemIcon>
            <ListItemText primary="Any one" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
