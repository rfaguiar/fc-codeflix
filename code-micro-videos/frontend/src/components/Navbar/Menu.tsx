import * as React from 'react';
import {IconButton, Menu as MuiMenu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";

export const Menu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event:any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpen}
            >
                <MenuIcon/>
            </IconButton>
            <MuiMenu
                id="menu-appbar"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleClose}>
                    Categorias
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Generos
                </MenuItem>
            </MuiMenu>
        </>
    );
};