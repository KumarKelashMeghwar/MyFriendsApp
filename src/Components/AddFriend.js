import React, { useState } from "react";
import axios from "axios";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// Text Field inputs
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Radio buttons
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// Button
import Button from "@mui/material/Button";
// Tooltip
import { Tooltip } from "@mui/material";

import { useNavigate } from "react-router-dom";

// Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const AddFriend = () => {
  let navigate = useNavigate();
  const [style, setStyle] = useState("none");
  const [selectedFile, setSelectedFile] = useState({});
  const [imgAttrib, setImageAttrib] = useState("upload-image.png");

  const [mobile, setMobile] = useState("");

  // Database fields

  const [name, setName] = useState("");
  const [country, setCountryName] = useState("Pakistan (‫پاکستان‬‎)");
  const [gender, setGender] = useState("");

  const sstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  function selectFileHandler(e) {
    setSelectedFile(e.target.files[0]);

    if (selectedFile) {
      const reader = new FileReader();
      if (selectedFile) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.addEventListener("load", () => {
        setImageAttrib(reader.result);
        setStyle("none");
      });
    }
  }

  const submitData = async () => {
    if (!name) {
      alert("Please enter valid name");
      return;
    }

    if (!gender) {
      alert("Please select the gender also");
      return;
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("country", country);
    formData.append("mobile", mobile);
    formData.append("gender", gender);
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    formData.append("userId", userId);

    const URL = "https://myfriendsappnode.herokuapp.com/add-friend";

    if (mobile.length === 13 || mobile.length === 12) {
      axios
        .post(URL, formData, config)
        .then((response) => {
          alert("Friend added successfully");
        })
        .catch((error) => {
          console.log("Error while uploading image" + error);
        });
      handleOpen();
    } else {
      alert("Please input valid mobile number");
    }
  };

  return (
    <>
      <form className="upload-form">
        <div className="form-group">
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={sstyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Data Submission
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Your friend data has been successfully saved!
                </Typography>
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </Modal>
          </div>
          <div className="profile-pic">
            <img
              src={imgAttrib}
              onMouseLeave={() => {
                setStyle("none");
              }}
              onMouseEnter={() => {
                setStyle("block");
              }}
              alt="profile-pic"
              id="photo"
              htmlFor="file"
            />
            <input
              onChange={selectFileHandler}
              type="file"
              name="image"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
            />
            <label
              htmlFor="file"
              onMouseEnter={() => {
                setStyle("block");
              }}
              onMouseLeave={() => {
                setStyle("none");
              }}
              style={{ display: `${style}` }}
              id="uploadBtn"
            >
              Choose Photo
            </label>
          </div>
          <div className="name">
            <Box>
              <TextField
                id="outlined-basic"
                label="Enter name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </div>

          <div className="gender">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "#595A5A",
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "#595A5A",
                        },
                      }}
                    />
                  }
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Tooltip title="Select country">
            <div className="country" style={{ cursor: "pointer" }}>
              <CountryDropdown
                id="country_select"
                className="country_selection"
                style={{ cursor: "pointer" }}
                preferredCountries={["pk", "in"]}
                handleChange={(e) => setCountryName(e.target.value)}
              ></CountryDropdown>
            </div>
          </Tooltip>

          <div className="mobile_number">
            <Tooltip title="Enter phone number">
              <PhoneInput
                placeholder="Enter phone number"
                value={mobile}
                onChange={setMobile}
              />
            </Tooltip>
          </div>

          <div className="submit">
            <Button
              variant="contained"
              style={{ backgroundColor: "orange", width: "235px" }}
              onClick={() => submitData()}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFriend;
