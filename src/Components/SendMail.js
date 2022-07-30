import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";

const SendMail = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [retypePass, setRetypePass] = useState("");

  let token = useLocation().search;
  token = token.slice(7, token.length);

  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 280,
    margin: "40px auto",
  };
  const errorStyle = {
    backgroundColor: "#FFBABA",
    color: "red",
    width: 280,
    margin: "20px auto",
    padding: "5px",
    minHeight: "7vh",
  };

  // Error message
  let [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async () => {
    if (password !== retypePass) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters");
      return;
    }

    setErrorMessage("");

    let response = await fetch(
      "https://myfriendsappnode.herokuapp.com/resetPassword?token=" + token,
      {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    if (response.modifiedCount === 1) {
      console.log(response);
      alert("Congratulations 🎉! Password has been reset!");
      navigate("/login");
    } else if (response.message === "Token not found in database") {
      alert(
        "Dear user, this email is now expired! Kindly send the forget password email again!"
      );
      navigate("/forgot-password");
    }
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
        <Paper elevation={12} style={paperStyle}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar style={{ backgroundColor: "orange" }}>
              <LockResetIcon />
            </Avatar>
            <h4
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Reset Password
            </h4>
          </Grid>
          <TextField
            name="password"
            variant="standard"
            label="Password"
            autoComplete="off"
            style={{
              margin: "20px 0",
            }}
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
            style={{
              marginBottom: "20px",
            }}
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
            Reset Password
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default SendMail;
