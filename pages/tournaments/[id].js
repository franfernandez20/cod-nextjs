import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import useUser from "../../hooks/useUser";
import SectionHeader from "../../components/sections/partials/SectionHeader";
import { SectionSplitProps } from "../../utils/SectionProps";
import ButtonGroup from "../../components/elements/ButtonGroup";
import Button from "../../components/elements/Button";
import Modal from "../../components/elements/Modal";

import Image from "../../components/elements/Image";

import { store } from "../../hooks/store";
import {
  inscribeUserToTournament,
  deleteUserToTournament,
} from "../../firebase/client";

const diaSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

export default function Tournaments({
  className,
  topOuterDivider,
  bottomOuterDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) {
  const [user, logOut, updateUser] = useUser();
  const [inscripcionModalActive, setInscripcionModalActive] = useState(false);
  const [inscripcionDone, setInscripcionDone] = useState(false);
  const globalState = useContext(store);
  const router = useRouter();
  const { state, dispatch } = globalState;
  console.log("state", state);

  const validUser = user && user.username && user.cod;

  const topDivider = true;

  const { tournament } = state;

  useEffect(() => {
    if (
      user &&
      user.tournaments.filter((e) => e.tid === tournament.id).length > 0
    )
      setInscripcionDone(true);
  }, []);

  // useEffect(() => {
  //   if (user && user.tournaments.filter((e) => e.tid === id).length > 0) setInscribedUser(true)
  //   else setInscribedUser(false)
  // }, [inscripcionDone]);

  const handleInscripcion = (e) => {
    e.preventDefault();
    setInscripcionModalActive(true);
  };

  const closeInscripcionModal = (e) => {
    e.preventDefault();
    setInscripcionModalActive(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    inscribeUserToTournament(user.id, tournament).then(() => {
      setInscripcionDone(true);
    });
  };

  const handleCancel = (e) => {
    closeInscripcionModal(e);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUserToTournament(user.id, tournament);
    setInscripcionDone(false);
    dispatch({ type: "tournament-deleteUser", value: user.id });
    router.push("/");
  };

  const outerClasses = classNames(
    "features-split section tournaments",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Workflow that just works",
    paragraph:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className="center-content heading">
            <h2
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              <span className="text-color-primary">
                {diaSemana[new Date(tournament.fecha).getDay()]}
              </span>
            </h2>
            <h3
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              <span className="text-color-low">
                {new Date(tournament.fecha).toLocaleDateString()}
              </span>
              <span className="text-color-primary"> | </span>
              <span className="text-color-high">
                {new Date(tournament.fecha).toLocaleTimeString()}
              </span>
            </h3>
            <div className="container-xs">
              {inscripcionDone ? (
                <>
                  <div className="borrarme-section">
                    <p className="text-xs mr-16">
                      Ya estas apuntado a este torneo
                    </p>
                    <Button
                      className=""
                      size="xxs"
                      color="error"
                      onClick={handleDelete}
                    >
                      Borrarme
                    </Button>
                  </div>
                  <h4 className="mt-8">
                    Pago confirmado:
                    {user.tournaments.includes(tournament.id) &&
                    user.tournaments.find((e) => e.tid === tournament.id).payed
                      ? " SI"
                      : " NO"}
                  </h4>
                </>
              ) : (
                <div className="reveal-from-bottom" data-reveal-delay="600">
                  <ButtonGroup>
                    <Button
                      color="primary"
                      onClick={handleInscripcion}
                      disabled={!validUser}
                      wideMobile
                    >
                      Inscribirse
                    </Button>
                  </ButtonGroup>
                </div>
              )}
            </div>
            <Modal
              show={inscripcionModalActive}
              handleClose={closeInscripcionModal}
            >
              {!inscripcionDone ? (
                <div>
                  <p>
                    Por el momento el metodo de pago será a través de Bizum a
                    fín de evitar comisiones de terceros. Tendréis que realizar
                    el pago al número de teléfono indicado con tu GameId como
                    asunto.
                  </p>
                  <h4>690 000 000</h4>
                  <p>
                    Una vez validado el pago apareceras inscrito en el torneo. Y
                    tendrás acceso a el con tu GameId
                  </p>
                  <p className="text-color-low">
                    Consulta esta sección para mas información{" "}
                  </p>
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
              ) : (
                <div>
                  <h1 className="text-color-high">
                    {" "}
                    ¡ Felicidades estas inscrito !
                  </h1>
                  <h3 className="text-color-seconday">
                    {" "}
                    Práctica ya queda poco{" "}
                  </h3>
                </div>
              )}
            </Modal>
          </div>
          {/* <SectionHeader data={sectionHeader} className="center-content back-foto" /> */}
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Descripción del evento
                </div>
                {tournament && (
                  <h3 className="mt-0 mb-12">
                    {tournament.mapa} | {tournament.modo} | k/d max:{" "}
                    {tournament.kdmax}{" "}
                  </h3>
                )}
                <p className="m-0">
                  Estas partidas, ganarán 1 punto por eliminación; con 20 puntos
                  por una victoria, 15 por los 5 primeros, 10 por los 15 primero
                  y 5 por los 25 primeros. El ganador será el equipo con más
                  puntos después de las 3 partidas privadas
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src="/images/zeus-s1.jpg"
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div>
                <h3 className="mt-0 mb-12">Data-driven insights</h3>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  — Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  // src={require("./../../assets/images/features-split-image-02.png")}
                  alt="Features split 02"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div>
                <h3 className="mt-0 mb-12">Data-driven insights</h3>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  — Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  // src={require("./../../assets/images/features-split-image-03.png")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
