import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import classNames from "classnames";

import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import Input from "../elements/Input";
import Select from "../elements/Select";

import {
  loginWithGoogle,
  logOutFromGoogle,
  createDBUser,
} from "../../firebase/client";
import * as codtrackerService from "../../services/codtrackerService";
import * as codTournamentService from "../../services/codtournamentService";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  // const [videoModalActive, setVideomodalactive] = useState(false);

  const [user, logOut, updateUser] = useUser();

  const [registroModalActive, setRegistroModalActive] = useState(false);
  const [registroValue, setRegistroValue] = useState("");
  const [resgistroResults, setResgistroResults] = useState([]);
  const [registroError, setRegistroError] = useState(false);
  const [logged, setLogged] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const closeRegistroModal = (e) => {
    e && e.preventDefault();
    setRegistroModalActive(false);
    setRegistroValue("");
    setResgistroResults([]);
    setLoading(false);
  };

  const handleRegistro = () => {
    console.log("Click");
    setRegistroModalActive(true);
    // codtrackerService.getUserDetails("destrozapanchos2").then(console.log);
  };

  const handleRegistroChange = (e) => {
    e.preventDefault();
    e && e.target && setRegistroValue(e.target.value);
  };

  const handleRegistroClick = (e) => {
    console.log("clicket");
  };

  const checkUser = (user) => {
    setLoading(true);
    const { username } = user;
    return codTournamentService.getUserStats(username).then((stats) => {
      console.log("stats", stats);
      const { kdRatio, deaths, kills, wins } = stats.wz.br_all.properties;
      const newlogged = { ...user, kdRatio, deaths, kills, wins };
      setLogged(newlogged);
      setResgistroResults([]);
      setLoading(false);
      console.log("newlogged", newlogged);
    });
  };

  const handleRegistroSubmit = (e) => {
    e && e.preventDefault();
    console.log("ddd", registroValue);
    setLoading(true);
    codTournamentService
      .getUserDetails(registroValue)
      .then((result) => {
        if (result.length === 0) {
          setRegistroError(true)
        } else if (result.length > 1) {
          setResgistroResults(result);
          console.log("result", result);
          console.log("resgistroResults", resgistroResults);
        } else if (result.length === 1) {
          const user = result[0];
          checkUser(user).then(() => {});
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log("error");
      });
    setRegistroValue("");
  };

  const handleSelectedUser = (user, e) => (e) => {
    console.log("yessss", e);
    console.log("yessss", user);
    checkUser(user);
  };

  const handleSubmitResults = (e) => {
    console.log("yessss", e);
  };

  const handleConfirm = () => {
    console.log("yessss");
    console.log("user", user);
    console.log(logged);
    const {
      platform,
      username,
      accountId,
      gameAvatar = "",
      kdRatio,
      deaths,
      kills,
      wins,
    } = logged;
    const newuser = {
      ...user,
      gameid: username,
      cod: { platform, accountId, gameAvatar, kdRatio, deaths, kills, wins },
    };
    createDBUser(newuser);
    updateUser(newuser);
    closeRegistroModal();
  };

  const handleCancel = (e) => {
    setLogged(undefined);
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Torneos privados <span className="text-color-primary">COD</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Como de bueno eres en WarZone prepara a tu equipo y demostrazlo.
              </p>
              {user && user.username && !user.cod && (
                <div className="reveal-from-bottom" data-reveal-delay="600">
                  <ButtonGroup>
                    <Button
                      tag="a"
                      color="primary"
                      onClick={handleRegistro}
                      wideMobile
                    >
                      Registra tu usuario
                    </Button>
                    <Button
                      tag="a"
                      color="dark"
                      wideMobile
                      href="https://github.com/cruip/open-react-template/"
                    >
                      Más información
                    </Button>
                  </ButtonGroup>
                </div>
              )}
            </div>
          </div>
          <Modal show={registroModalActive} handleClose={closeRegistroModal}>
            {loading ? (
              <img src="/spinner.gif" />
            ) : (
              <>
                {!logged ? (
                  <div>
                    <div className="features-tiles-item-content">
                      <h4 className="mt-0 mb-8">Registro</h4>
                      <p className="mb-16 text-sm">
                        Vamos a buscar tu usuario en{" "}
                        <strong>https://my.callofduty.com/</strong>
                      </p>
                      {
                        registroError && (
                          <p className="text-color-error"> No se encontró el usuario</p>
                        )
                      }
                    </div>
                    <form onSubmit={handleRegistroSubmit}>
                      {resgistroResults.length === 0 && (
                        <>
                          <Input
                            id="newsletter"
                            type="search"
                            label="Registro"
                            labelHidden
                            hasIcon="right"
                            placeholder="GAMER ID"
                            value={registroValue}
                            onChange={handleRegistroChange}
                            // onKeyPress={handleRegistroEnter}
                          >
                            <svg
                              className="text-color-primary"
                              height="21"
                              viewBox="0 0 21 21"
                              width="21"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                fill="none"
                                fill-rule="evenodd"
                                stroke="#5658DD"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <circle cx="8.5" cy="8.5" r="5" />
                                <path d="m17.571 17.5-5.571-5.5" />
                              </g>
                            </svg>
                          </Input>
                          <Button
                            className="mt-16"
                            tag="a"
                            color="primary"
                            onClick={handleRegistroSubmit}
                            wideMobile
                          >
                            Buscar
                          </Button>
                        </>
                      )}
                      <ul>
                        {resgistroResults.length > 1 &&
                          resgistroResults.map((user) => (
                            <li
                              className="ta-l has-bg-color"
                              onClick={handleSelectedUser(user)}
                            >
                              <p className="text-color-low mb-0 ml-8 ">
                                {user.username}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </form>
                  </div>
                ) : (
                  <div className="">
                    <p className="mb-8 ">¿Quieres confirmar este usuario?</p>
                    <strong>Solo prodrás acceder a los torneos con él</strong>
                    <h3 className="mt-16 mb-0 text-color-secondary has-bottom-divider">
                      {logged.username}
                    </h3>
                    <h4 className="mt-0 mb-8 text-color-ligt">
                      K/D: {Math.floor(logged.kdRatio * 100) / 100}
                    </h4>
                    <ButtonGroup className="mt-8">
                      <Button
                        tag="a"
                        color="primary"
                        size="sm"
                        onClick={handleConfirm}
                        wideMobile
                      >
                        Confirmar
                      </Button>
                      <Button
                        tag="a"
                        size="sm"
                        color="error"
                        onClick={handleCancel}
                        wideMobile
                      >
                        Cancelar
                      </Button>
                    </ButtonGroup>
                  </div>
                )}
              </>
            )}
          </Modal>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
