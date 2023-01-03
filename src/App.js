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
            <header className="App-header">LILPOP</header>

            <Container maxWidth="false"
                       justifyContent="flex-start"
                       alignItems="flex-start">
                <Grid container spacing={0.5}>
                    <Grid item xs={2}>
                        <Item>Left Menu</Item>
                    </Grid>
                    <Grid item xs={10}>
                        <SignInSide></SignInSide>
                    </Grid>
                </Grid>
            </Container>

            <footer>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://lilpop.net/">
                        KREDIMEDIA
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        </div>
    );
}

export default App;
