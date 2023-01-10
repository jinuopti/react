import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import KakaoButton from "../login/KakaoButton";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router";
import axios from "axios";
import {auth} from "../login/FirebaseLogin"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {JOIN_URL, LOGIN_URL} from "../configs/Url";
import NaverButton from "../login/NaverLogin";
import {useState} from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://lilpop.net/">
        KREDIMEDIA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupInfo, setSignupInfo] = useState({})
  const [authData, setAuthData] = useLocalStorage("Auth")
  const navigate = useNavigate()

  const handleSignupOpen = () => {
    setSignupOpen(true)
  }

  const handleSignupClose = () => {
    setSignupOpen(false)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const id = e.target.userid.value
    const pass = e.target.password.value
    const nick = e.target.nickname.value
    console.log(id, pass, nick)
    if (id.length <= 0 || pass.length <= 0 || nick.length <= 0) {
      console.log("length error")
      alert("정보를 모두 입력해주세요")
      return
    } else {
      LilpopSignup({
        userid: id,
        password: pass,
        nickname: nick,
      })
    }
    setSignupOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("sign in start, data: ", event.currentTarget)
    LilpopLogin({
      userid: data.get('userid'),
      password: data.get('password')
    })
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((params) => {
        console.log(params) // console로 들어온 데이터 표시
        const data = {
          "auth_type": "google",
          "access_token": params.user.accessToken,
        }
        axios.post(LOGIN_URL, data)
          .then((response) => {
            console.log("response: ", response)
            setAuthData({
              "authenticated": true,
              "authType": "google",
              "authToken": response.data.access_token,
              "id": response.data.id,
              "refreshToken": response.data.refresh_token,
              "nickname": response.data.nickname,
            })
            navigate("/")
          })
          .catch((error) => {
            console.log("error: ", error)
          })
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  }

  const handleKakaoLogin = (params) => {
    console.log("HandleKakaoLogin: ", params)
  }

  const LilpopLogin = (props) => {
    const data = {
      "id": props.userid,
      "auth_type": "lilpop",
      "password": btoa(props.password),
    }
    console.log("Lilpop Login Req: ", data)
    axios.post(LOGIN_URL, data)
      .then((response) => {
        console.log("response: ", response)
        setAuthData({
          "authenticated": true,
          "authType": "lilpop",
          "authToken": response.data.access_token,
          "id": response.data.id,
          "refreshToken": response.data.refresh_token,
          "nickname": response.data.nickname,
        })
        navigate("/")
      })
      .catch((error) => {
        console.log("error: ", error)
      })
  }

  const LilpopSignup = (props) => {
    const data = {
      id: props.userid,
      password: btoa(props.password),
      nickname: props.nickname,
    }
    console.log("Lilpop Join Req: ", data)
    axios.post(JOIN_URL, data)
      .then(res => {
        console.log("res: ", res)
        LilpopLogin({
          userid: props.userid,
          password: props.password,
        })
      })
      .catch(err => {
        console.log("error: ", err)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: 'url(/images/lilpop-img.png)',
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userid"
                label="User ID"
                name="userid"
                autoComplete="userid"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>
              <Box sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <img src={"images/btn_google_signin_light_normal_web.png"}
                       className="btnLink" onClick={handleGoogleLogin}/>
                  <KakaoButton />
                  <NaverButton />
                </Stack>
              </Box>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                  <Link href="#" variant="body2" onClick={handleSignupOpen}>
                    {"Sign Up"}
                  </Link>
                </Stack>
              </Box>
              <Copyright sx={{mt: 5}}/>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={signupOpen} onClose={handleSignupClose}>
        <DialogTitle align="center">Sign Up</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSignupSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{mt: 2}}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <DialogContentText>
                  User ID
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="normal"
                  id="userid"
                  label="User ID"
                  type="text"
                  variant="outlined"
                  size="small"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <DialogContentText>
                  Password
                </DialogContentText>
                <TextField
                  required
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <DialogContentText>
                  Nickname
                </DialogContentText>
                <TextField
                  required
                  margin="normal"
                  id="nickname"
                  label="Nickname"
                  type="text"
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignupClose}>Cancel</Button>
            <Button type="submit">Sign Up</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </ThemeProvider>
  );
}
