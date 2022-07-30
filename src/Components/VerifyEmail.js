import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  let userid = useLocation().search;
  userid = userid.slice(8, userid.length);
  let [message, setMessage] = useState("");
  useEffect(() => {
    async function callApi() {
      let response = await fetch(
        "https://myfriendsappnode.herokuapp.com/verifyemail?userid=" + userid,
        {
          method: "POST",
          body: JSON.stringify({ userid }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response.message) {
        setMessage(response.message);
        alert(response.message);
      } else {
        console.log("An error occured while verifying the user!");
      }
    }
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2 style={{ margin: "60px 0 0 60px" }} className="verifyEmailMessage">
        {message
          ? message
          : "Error occured while verifying you. Please try again!"}
      </h2>
    </>
  );
};

export default VerifyEmail;
