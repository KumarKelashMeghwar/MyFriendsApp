import React, { useState } from "react";
import { Grid, Paper, Avatar, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import TextField from "@mui/material/TextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePass, setRetypePass] = useState("");

  // Error message
  let [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.length < 3 || !name) {
      setErrorMessage("Name must be at least 3 characters");
      return;
    }
    if (!validateEmail(email) || !email) {
      setErrorMessage("Email is invalid");
      return;
    }

    if (password !== retypePass || !password || !retypePass) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters");
      return;
    }

    setErrorMessage("");

    let response = await fetch(
      "https://myfriendsappnode.herokuapp.com/register",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    alert(response);
  };

  const paperStyle = {
    padding: 20,
    width: 280,
  };
  const errorStyle = {
    backgroundColor: "#FFBABA",
    color: "red",
    width: 280,
    margin: "20px auto",
    padding: "5px",
    minHeight: "7vh",
  };

  const avatarStyle = {
    backgroundColor: "orange",
  };

  const [ptype, setPType] = useState("password");
  const [rtype, setRType] = useState("password");

  const [pIcon, setPIcon] = useState(false);
  const [rIcon, setRIcon] = useState(false);

  const eyepHandler = () => {
    setPType(ptype === "password" ? "text" : "password");
    setPIcon(!pIcon);
  };

  const eyerHandler = () => {
    setRType(rtype === "password" ? "text" : "password");
    setRIcon(!rIcon);
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
              <HowToRegIcon />
            </Avatar>
            <h4
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </h4>
          </Grid>
          <TextField
            id="standard-basic"
            variant="standard"
            label="Name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoComplete="off"
            required
          ></TextField>
          <TextField
            id="standard"
            variant="standard"
            label="Email"
            type="email"
            autoComplete="off"
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
            autoComplete="off"
            placeholder="Enter password"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          ></TextField>
          <TextField
            name="confirmPassword"
            variant="standard"
            label="Retype Password"
            autoComplete="off"
            placeholder="Password"
            type={rtype}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer", marginRight: "5px" }}
                  onClick={eyerHandler}
                >
                  {rIcon ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </InputAdornment>
              ),
            }}
            value={retypePass}
            onChange={(e) => setRetypePass(e.target.value)}
            fullWidth
            required
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={submitHandler}
            style={{ margin: "20px 0 15px 0", backgroundColor: "orange" }}
          >
            Sign Up
          </Button>
          <span className="already-link" style={{ color: "#666666" }}>
            Already have an account?
          </span>
          <NavLink
            to="/login"
            style={{ color: "#1f05b2", textDecoration: "none" }}
          >
            Sign In!
          </NavLink>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
