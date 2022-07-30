import React from "react";
import "../Components/cardcss.css";
import DeleteIcon from "@mui/icons-material/Delete";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FriendCard = ({ photo, name, gender, country, mobile }) => {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  let imgSrc = `data:image/png;base64,${toBase64(photo)}`;

  const sstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
    window.location.reload();
  };

  async function deleteHandler(mobile) {
    let userResponse = window.confirm("Are you sure to delete this friend?");

    if (userResponse) {
      const response = await fetch(
        "https://myfriendsappnode.herokuapp.com/delete-friend",
        {
          method: "POST",
          body: JSON.stringify({ mobile }),
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(await response.json());
      handleOpen();
    } else {
      return;
    }
  }

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={sstyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Deleted successfully
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your friend data has been successfully deleted!
            </Typography>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
      <div className="friend_card">
        <div className="picture">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="name">
          <b>Name: </b> {name}
        </div>
        <div className="gender_">
          <b>Gender: </b> {gender}
        </div>
        <div className="country_name">
          <b>Country: </b> {country}
        </div>
        <div className="mobile_num">
          <b>Mobile No. </b> {mobile}
        </div>

        <div className="action_buttons">
          <div className="delete_btn" onClick={() => deleteHandler(mobile)}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
