import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "40px auto",
  };

  const avatarStyle = {
    backgroundColor: "orange",
  };

  const errorStyle = {
    backgroundColor: "#FFBABA",
    color: "red",
    width: 280,
    margin: "20px auto",
    padding: "5px",
    minHeight: "7vh",
  };

  let [Message, setMessage] = useState("");
  const [ptype, setPType] = useState("password");
  const [pIcon, setPIcon] = useState(false);

  let navigate = useNavigate();

  const eyepHandler = () => {
    setPType(ptype === "password" ? "text" : "password");
    setPIcon(!pIcon);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message
  let [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !email) {
      setErrorMessage("Email is invalid");
      return;
    }

    if (!password || password.length < 5) {
      setErrorMessage("Password must be at least 5 characters");
      return;
    }

    setErrorMessage("");

    let response = await fetch(
      "https://myfriendsappnode.herokuapp.com/signin",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    if (response.auth) {
      localStorage.setItem("token", JSON.stringify(response.auth));
      localStorage.setItem("user", JSON.stringify(response.user));
      console.log("Logged in");
      navigate("/");
      window.location.reload();
    } else {
      localStorage.clear();
      setMessage(response.message);
    }
  };

  return (
    <>
      <Grid>
        {errorMessage && (
          <div className="error-message" style={errorStyle}>
            {errorMessage}
          </div>
        )}
        <Paper elevation="10" style={paperStyle}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h4
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Sign In
            </h4>
          </Grid>
          <TextField
            id="standard-basic"
            variant="standard"
            label="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          ></TextField>
          <TextField
            name="password"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              autoComplete: "off",
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={eyepHandler}
                  style={{ marginRight: "5px", cursor: "pointer" }}
                >
                  {pIcon ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </InputAdornment>
              ),
            }}
            type={ptype}
            placeholder="Enter password"
            fullWidth
            required
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            onClick={loginHandler}
            fullWidth
            style={{ marginTop: "15px", backgroundColor: "orange" }}
          >
            Sign In
          </Button>
          <NavLink
            to="/forgot-password"
            style={{
              color: "#1f05b2",
              textDecoration: "none",
              margin: "15px 0 10px 0",
              display: "inline-block",
            }}
          >
            Forgot Password?
          </NavLink>
          <br />
          <span style={{ color: "#666666" }}>Don't have an account? </span>
          <NavLink
            to="/signup"
            style={{ color: "#1f05b2", textDecoration: "none" }}
          >
            Sign Up!
          </NavLink>
        </Paper>
        {Message ? (
          <div className="message" style={errorStyle}>
            {Message}
          </div>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default Login;
