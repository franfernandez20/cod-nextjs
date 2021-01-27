import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";
import Logo from "./partials/Logo";
import Avatar from "../elements/Avatar";
import { loginWithGoogle, logOutFromGoogle } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import Button from "../elements/Button";
import { getUserDetails } from "../../services/codtrackerService";

import { store } from "../../hooks/store";

// import API from '../../services/codAPI'
// const API = require('call-of-duty-api')({ platform: "battle" });

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const [user, logOut, updateUser] = useUser();

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  useEffect(() => {
    if (user) hideSignin = true;
    console.log("user", user);
  }, [user]);

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const test = () => {
    console.log("globalstorage", globalState);
    // dispatch({ type: 'init' })
  };
  const test2 = () => {
    console.log("globalstorage", globalState);
    updateUser();
    // dispatch({ type: "update", value: { name: "pepito" } });
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  const handleSignin = (e) => {
    e.preventDefault();
    closeMenu();
    loginWithGoogle().catch((err) => {
      console.log(err);
    });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    closeMenu();
    logOutFromGoogle()
      .then(() => {
        // Sign-out successful.
        logOut();
      })
      .catch((error) => {
        console.log("error", error);
        // An error happened.
      });
  };

  const handleLogoClick = () => {
    console.log("Click");
    getUserDetailsCT("destrozapanchos2").then(console.log);
  };

  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo onClick={handleLogoClick} />
          {!hideNav && (
            <>
              <>
                {user && user.username && (
                  <div className="header-nav-bar">
                    <Avatar alt={user.username} src={user.avatar} />
                    <div className="header-nav-user">
                      <p className="text-color-primary has-bottom-divider">
                        {user.username}
                      </p>
                      <p className="text-color-secondary">{user.gameid}</p>
                    </div>
                    <div className="header-nav-kd">
                      <p className="ml-8 mt-0 mr-16 mb-0 ta-l text-xxs">
                        K/D
                        <span className="text-color-high fw-700 ml-8 mt-0 mr-16 mb-0 ta-l has-shadow text-sm">
                          {Math.floor(user.cod.kdRatio * 100) / 100}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <button
                  ref={hamburger}
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
              </>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  {/* <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li onClick={test}>
                      <Link href="#0" onClick={closeMenu}>
                        Link aux
                      </Link>
                    </li>
                    <li onClick={test2}>
                      <Link href="#0" onClick={closeMenu}>
                        Link aux
                      </Link>
                    </li>
                  </ul> */}
                  {!user || !user.username ? (
                    <ul className="list-reset header-nav-right">
                      <li>
                        <Button
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={handleSignin}
                        >
                          Iniciar sesión
                        </Button>
                      </li>
                    </ul>
                  ) : (
                    <>
                      <ul className="list-reset header-nav-right">
                        {user.cod && (
                          <li>
                            <div className="header-nav-right-kd">
                              <Link href="#0" onClick={closeMenu}>
                                <p className="ml-8 mt-0 mr-16 mb-0 ta-l text-xxs">
                                  K/D
                                  <span className="text-color-high fw-700 ml-8 mt-0 mr-16 mb-0 ta-l has-shadow text-sm">
                                    {Math.floor(user.cod.kdRatio * 100) / 100}
                                  </span>
                                </p>
                              </Link>
                            </div>
                          </li>
                        )}
                      </ul>
                      <ul className="list-reset header-nav-right">
                        <li>
                          {/* <span
                            className="ml-24 button button-sm magin-top-16-mobile"
                            onClick={handleLogOut}
                          >
                            Log out
                          </span> */}
                          {/* <Link to="#0" onClick={closeMenu}>Link aux</Link> */}
                          <Button
                            color="ligth"
                            size="sm"
                            onClick={handleLogOut}
                            wideMobile
                          >
                            Log out
                          </Button>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
