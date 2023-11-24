import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css'
import Leftbar from '../Leftbar/Leftbar';
import BlocklyPage from '../BlocklyPage/BlocklyPage';
export default function Navbar(props: { downloadXml?: Function, loadXml?: Function,fileInputRef:any }) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
    const toggleDrawer = (open: boolean) => {
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
        <Box >
            <AppBar style={{ height: '7%', backgroundColor: '#245a71' }}>
                <Toolbar variant="dense" className='toolbar'>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon onClick={() => toggleDrawer(!isDrawerOpen)} />
                    </IconButton>
                    <Typography variant="h5" color="inherit" component="div">
                        Functional Block Diagram
                    </Typography>
                    <button onClick={ props?.downloadXml}>Json İndir</button>
                    <input
                        type="file"
                        id="file"
                        style={{ display: 'none' }}
                        onChange={props.loadXml}
                        ref={props.fileInputRef}
                    />
                    <button
                        onClick={() => props.fileInputRef.current && props.fileInputRef.current.click()}
                    >
                         Json Yükle
                    </button>
                </Toolbar>
            </AppBar>

        </Box>
    );
}