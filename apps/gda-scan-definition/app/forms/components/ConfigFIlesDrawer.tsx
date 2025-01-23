"use client";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { useConfigContext } from './ConfigContext';
import { FileItem, useIDEDispatch, useIDEState } from '../../components/ideReducer';
import { Typography } from '@mui/material';
import { getFilesByPath } from '../../actions/tree-actions';
import { TreeViewBaseItem } from '@mui/x-tree-view';

export default function ConfigFilesDrawer() {
    const config = useConfigContext();
    const [open, setOpen] = useState(false);
    const dispatch = useIDEDispatch();
    const state = useIDEState();

    const fetchFilepath = async () => {
        dispatch({ type: 'FETCH_FILE_TREE_START', payload: { folderPath: config.configUrl } });

        const response = await getFilesByPath({ path: config.configUrl });
        if (!response || !response.data) {
            dispatch({ type: 'FETCH_FILE_TREE_ERROR', payload: { folderPath: config.configUrl, error: 'No files found' } });
            return;
        }
        const items: FileItem[] = response.data.files;
        dispatch({ type: 'FETCH_FILE_TREE_SUCCESS', payload: items });
        setOpen(true);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Button onClick={fetchFilepath}>Fetch files</Button>
            <Typography variant="h6">Folders</Typography>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Typography variant="h6">Files</Typography>
            <List>
                {state.fileTree.map((file: FileItem, index) => (
                    <ListItem key={file.id} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={file.label} onClick={() => {
                                dispatch({ type: 'OPEN_TAB', payload: file });
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button color="inherit" onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
