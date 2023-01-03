import './App.css';
import {styled} from '@mui/material/styles';
import {Container, Box, Grid, Paper, TextField, ButtonGroup, Button} from "@mui/material";
import SignInSide from "./pages/Signin";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function App() {
    return (
        <div className="App">
            <SignInSide></SignInSide>
        </div>
    );
}

export default App;
