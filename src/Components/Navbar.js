import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  let [auth, setAuth] = useState(false);
  let [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth(true);
      setUser(JSON.parse(localStorage.getItem("user")).name);
    } else {
      setAuth(false);
    }
  }, []);

  let [menu, setMenu] = useState("links");
  const showMenu = () => {
    if (menu === "links") {
      setMenu("showMenu");
    } else {
      setMenu("links");
    }
  };
  return (
    <>
      <section className="navbarr">
        <nav>
          <div className="title">
            <li>
              <NavLink to="/" onClick={showMenu}>
                MyFriends
              </NavLink>
            </li>
          </div>
          <div className={menu}>
            {auth ? (
              <>
                <div>
                  <li>
                    <NavLink to="/home" onClick={() => setMenu("links")}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/add-a-new-friend"
                      onClick={() => setMenu("links")}
                    >
                      Add a new friend
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/login"
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                    >
                      Logout {user}
                    </NavLink>
                  </li>
                </div>
              </>
            ) : (
              <div>
                <li>
                  <NavLink to="/login" onClick={() => setMenu("links")}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={() => setMenu("links")}>
                    Signup
                  </NavLink>
                </li>
              </div>
            )}
          </div>
          <div className="menuIcon">
            <MenuIcon onClick={showMenu} />
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
