import React from "react";

const PageNotFound = () => {
  return (
    <>
      <h3 style={{ margin: "100px 0 30px 0px", textAlign: "center" }}>
        Page Not Found!
      </h3>
      <div
        style={{ margin: "40px 0 30px 0px", textAlign: "center" }}
        className="notFoundMessage"
      >
        Dear User, this website does not contain this page!
      </div>
    </>
  );
};

export default PageNotFound;
