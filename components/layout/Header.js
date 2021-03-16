import React, { useState, useRef, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import loggedUseUser from "../../hooks/loggedUseUser";
import Logo from "./partials/Logo";

import Avatar from "../elements/Avatar";
import Button from "../elements/Button";
import PsnIcon from "../elements/icons/psnIcon";
import ActivisionIcon from "../elements/icons/activisionIcon";
import Cod_JF from "../elements/icons/cod_JF";
import CodKD from "../elements/codKD";

import {
  loginWithGoogle,
  logOutFromGoogle,
  createTournament,
} from "../../firebase/client";
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
  const [loggedUser] = loggedUseUser();

  const globalState = useContext(store);
  const router = useRouter();

  const { dispatch } = globalState; // nota para modificar el stado en el contexto store

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
    if (loggedUser) hideSignin = true;
  }, [loggedUser]);

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
    router.push("/");
  };

  const handleOnUserClick = () => {
    router.push("/settings");
  };

  const siteTitle = "Torneos – COD JF 🎮";

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="description" content="Torneos Call Of Dutty | Warzone" />
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header {...props} className={classes}>
        <div className="container">
          <div
            className={classNames(
              "site-header-inner",
              bottomDivider && "has-bottom-divider"
            )}
          >
            {/* <Cod_JF onClick={handleLogoClick} /> */}
            <img
              className="logo-header"
              src="/svg-fondo-trans.png"
              onClick={handleLogoClick}
            />
            {!hideNav && (
              <>
                <>
                  {user && user.username && (
                    <div className="header-nav-bar">
                      <Avatar
                        alt={user.username}
                        src={
                          user.cod && user.cod.gameAvatar
                            ? user.cod.gameAvatar
                            : user.avatar
                        }
                      />
                      <div className="header-nav-user" onClick={handleOnUserClick}>
                        <p className="text-color-primary has-bottom-divider">
                          {user.username}
                        </p>
                        <div className="header-nav-user-game">
                          {user.cod && user.cod.platform === "psn" ? (
                            <PsnIcon className="psn-icon" />
                          ) : (
                            <ActivisionIcon className="psn-icon" />
                          )}
                          <p className="text-color-secondary font-elect">
                            {user.gameid}
                          </p>
                        </div>
                      </div>
                      {user.cod && (
                        <div className="header-nav-kd">
                          <CodKD kdRatio={user.cod.kdRatio} />
                        </div>
                      )}
                      {user.content && (
                        <div className="header-nav-wallet">
                          <div className="wallet-content">
                            <svg
                              width="100%"
                              height="100%"
                              version="1.1"
                              viewBox="0 0 20 20"
                              x="0px"
                              y="0px"
                              class="ScIconSVG-sc-1bgeryd-1 cMQeyU"
                            >
                              <path
                                fill="gray"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3 12l7-10 7 10-7 6-7-6zm2.678-.338L10 5.487l4.322 6.173-.85.728L10 11l-3.473 1.39-.849-.729z"
                              ></path>
                            </svg>
                            <span>{user.content.wallet}€</span>
                          </div>
                        </div>
                      )}
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
                    <div className="header-nav-links">
                      <div className="header-link">
                        <Link href="/reglamento" classNames="text-xs">
                          Reglamento
                        </Link>
                      </div>
                      <div className="header-link">
                        <Link href="/" classNames="text-xs">
                          Sobre nosotros
                        </Link>
                      </div>
                    </div>
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
                                  <CodKD kdRatio={user.cod.kdRatio} />
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
                        <p></p>
                      </>
                    )}
                  </div>
                </nav>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
