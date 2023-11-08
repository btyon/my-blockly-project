import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css'
import Leftbar from '../Leftbar/Leftbar';
export default function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
    const toggleDrawer = (open:boolean) => {
        const blockList = document.getElementsByClassName("blocklyFlyout")[1];
        if (open) {
            document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable")[0].style.display = "block";
            if (blockList.style.display !== "none") {
                blockList.style.display = "block";
            }
        }
        else {
            document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable")[0].style.display = "none";
            blockList.style.display = "none";
        }
        setIsDrawerOpen(open);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ height: '7%' }}>
                <Toolbar variant="dense" className='toolbar'>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon onClick={()=>toggleDrawer(!isDrawerOpen)} />
                    </IconButton>
                    <Typography variant="h5" color="inherit" component="div">
                        Functional Block Diagram
                    </Typography>
                </Toolbar>
            </AppBar>
            <Leftbar></Leftbar>


        </Box>
    );
}