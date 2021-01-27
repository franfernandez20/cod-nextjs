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

  const [user, logOut] = useUser();

  const [registroModalActive, setRegistroModalActive] = useState(false);
  const [registroValue, setRegistroValue] = useState("");
  const [resgistroResults, setResgistroResults] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [logged, setLogged] = useState(undefined);

  useEffect(() => {
    if (logged)
      // codTournamentService
      //   .getUserStats(encodeURIComponent(logged.username))
      //   .then((result) => {
      //   });
        console.log("motherFuckerrr");
  }, [logged]);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const closeRegistroModal = (e) => {
    e.preventDefault();
    setRegistroModalActive(false);
    setRegistroValue("");
    setResgistroResults([]);
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

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    console.log("ddd", registroValue);
    codTournamentService.getUserDetails(registroValue).then((result) => {
      if (result.length > 1) {
        setResgistroResults(result);
      } else if (result.length === 1) {
        const { username } = result[0];
        codTournamentService.getUserStats(username).then((stats) => {
          console.log("stats", stats);
          const { kdRatio, deaths, kills, wins } = stats.wz.br_all.properties;
          const newlogged = { ...result[0], kdRatio, deaths, kills, wins };
          setLogged(newlogged);
          console.log("newlogged", newlogged);
        });
      }
    });
    setRegistroValue("");
  };

  const handleSelectedUser = (e) => {
    console.log("yessss", e.target.value);
    console.log("yessss", selectValue);
    setSelectValue(e.target.value);
    setRegistroValue(e.target.value);
  };

  const handleSubmitResults = (e) => {
    console.log("yessss", e);
    console.log("yessss", selectValue);
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
              {user && !user.cod && (
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
          {/* <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div> */}
          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" /> */}
          <Modal show={registroModalActive} handleClose={closeRegistroModal}>
            {!logged ? (
              <div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Registro</h4>
                  <p className="mb-16 text-sm">
                    Vamos a buscar tu usuario en{" "}
                    <strong>https://my.callofduty.com/</strong>
                  </p>
                </div>
                <form onSubmit={handleRegistroSubmit}>
                  <Input
                    id="newsletter"
                    // type="email"
                    label="Registro"
                    labelHidden
                    hasIcon="right"
                    placeholder="GAMER ID"
                    value={registroValue}
                    onChange={handleRegistroChange}
                    // onKeyPress={handleRegistroEnter}
                  >
                    <svg
                      width="16"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                        fill="#376DF9"
                      />
                    </svg>
                  </Input>
                  {resgistroResults.length > 0 && (
                    <Select
                      className="mt-0 mb-8"
                      value={selectValue}
                      onClick={handleSelectedUser}
                    >
                      {resgistroResults.map((elem) => (
                        <option key={elem.accountId} value={elem.username}>
                          {elem.username}
                        </option>
                      ))}
                    </Select>
                  )}
                </form>
              </div>
            ) : (
              <div className="">
                <p className="mb-8 ">¿Quieres confirmar este usuario?</p>
                <p>
                  <strong>Solo prodrás acceder a los torneos con él</strong>
                  <h3 className="mt-16 mb-0 text-color-secondary">
                    {logged.username}
                  </h3>
                  <ButtonGroup>
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
                </p>
              </div>
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
