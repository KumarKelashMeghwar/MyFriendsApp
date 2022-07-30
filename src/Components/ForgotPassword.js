import React, { useState } from "react";

import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";

const ForgotPassword = () => {
  const errorStyle = {
    backgroundColor: "#FFBABA",
    color: "red",
    width: 280,
    margin: "20px auto",
    padding: "5px",
    minHeight: "7vh",
  };
  const paperStyle = {
    padding: 20,

    width: 280,
    margin: "80px auto",
  };
  const [email, setEmail] = useState("");

  let [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const sendEmail = async () => {
    if (!validateEmail(email) || !email) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    setErrorMessage("");

    let response = await fetch("http://localhost:3438/send_email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response);
    if (response.result === "No user found with this email") {
      alert("No user found with this email");
      return;
    } else if (response.result) {
      alert(
        "Kindly check your email address for reseting the password! Thank you ❤️"
      );
    } else {
      alert("Email is not valid! It doesn't exist");
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
        <Paper elevation="6" style={paperStyle}>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Avatar style={{ backgroundColor: "orange" }}>
              <KeyIcon />
            </Avatar>
            <h4
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Forgot Password
            </h4>
          </Grid>

          <TextField
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            name="email"
            label="Email"
            fullWidth
          />

          <Button
            onClick={sendEmail}
            fullWidth
            variant="contained"
            type="submit"
            style={{ marginTop: "15px", backgroundColor: "orange" }}
          >
            Send email
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default ForgotPassword;
