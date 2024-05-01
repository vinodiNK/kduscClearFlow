import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ViewListIcon from '@mui/icons-material/ViewList';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Clearence" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Clearence" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary="Update Clearence" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="View Clearence" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
    </React.Fragment>
);