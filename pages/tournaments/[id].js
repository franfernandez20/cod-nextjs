import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import useUser from "../../hooks/useUser";
import SectionHeader from "../../components/sections/partials/SectionHeader";
import { SectionSplitProps } from "../../utils/SectionProps";
import ButtonGroup from "../../components/elements/ButtonGroup";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import Modal from "../../components/elements/Modal";
import TourStats from "../../components/elements/tourStats";
import CheckCroos from "../../components/elements/icons/checkCross";
import CheckOk from "../../components/elements/icons/checkOk";

import Image from "../../components/elements/Image";

import { store } from "../../hooks/store";
import {
  inscribeUserToTournament,
  deleteUserToTournament,
  getTournamentWithStats,
  getUserTeamByTour,
  getTeamByName,
  inscribeTeam,
} from "../../firebase/client";
import UserIcon from "../../components/elements/icons/userIcon";

// import {} from "../../services/codtournamentService"

const tourStates = {
  PROX: 0,
  JUST_FINISH: 1,
  FINISHED: 2,
};

const diaSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const ChooseTeam = ({ team }) => {
  return (
    <p>
      {team.map((a) => {
        return a;
      })}
    </p>
  );
};

const SearchTeam = ({ tourid, tourModo, onTeamSelected }) => {
  const [searchModal, setSearchModal] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamsFound, setTeamsFound] = useState([]);
  const [registroError, setRegistroError] = useState(false);

  const handleGameIdChange = (e) => {
    e.preventDefault();
    e && e.target && setTeamName(e.target.value);
  };

  const handleRegistroSubmit = (e) => {
    e && e.preventDefault();
    setRegistroError(false);
    setTeamsFound([]);

    if (searchModal)
      getTeamByName(teamName, tourid).then((result) => {
        result.length === 0 ? setRegistroError(true) : setTeamsFound(result);
      });
    else onTeamSelected({ teamName: teamName, tourid, users: [] });
  };

  const handleSelectTeam = (team) => (e) => {
    e && e.preventDefault();
    !teamComplete(team.users.length) && onTeamSelected(team);
  };

  // To improve.. using 2times
  const teamComplete = (teamLength) => {
    if (teamLength === 2 && tourModo === "br_brduos") return true;
    if (teamLength === 3 && tourModo === "br_brtrios") return true;
    if (teamLength === 4 && tourModo === "br_brquads") return true;
    return false;
  };

  const selectSearchClasses = classNames(
    "select",
    searchModal && "select-press"
  );
  const selectCreateClasses = classNames(
    "select",
    !searchModal && "select-press"
  );

  return (
    <div>
      <div className="features-tiles-item-content">
        <h4 className="mt-0 mb-8"></h4>
        <div className="mb-16">
          <span
            className={selectSearchClasses}
            onClick={() => setSearchModal(true)}
          >
            Busca tu Team
          </span>
          <span
            className={selectCreateClasses}
            onClick={() => setSearchModal(false)}
          >
            Crea tu Team
          </span>
        </div>
        <p className="mb-16 text-sm">Introduce nombre del equipo</p>
        {registroError && (
          <p className="text-color-error"> No se encontró el Team</p>
        )}
      </div>
      <form onSubmit={handleRegistroSubmit}>
        <>
          <Input
            id="newsletter"
            type="search"
            label="Registro"
            labelHidden
            hasIcon="right"
            placeholder="TEAM NAME"
            value={teamName}
            onChange={handleGameIdChange}
          >
            {searchModal ? (
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
            ) : (
              <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                  fill="#376DF9"
                />
              </svg>
            )}
          </Input>
          <Button
            className="mt-16"
            tag="a"
            color="primary"
            onClick={handleRegistroSubmit}
            wideMobile
          >
            {searchModal ? "Buscar" : "Crear"}
          </Button>
        </>
        {teamsFound.map((team) => {
          return (
            <ul
              className={
                teamComplete(team.users.length)
                  ? "teamGroupComplete"
                  : "teamGroup"
              }
              onClick={handleSelectTeam(team)}
            >
              <h4 className="text-color-primary has-bottom-divider mb-0">
                {team.teamName}
              </h4>
              {team.users.map((user) => (
                <p className="text-color-low mt-0 mb-0">{user.gameid}</p>
              ))}
            </ul>
          );
        })}
      </form>
    </div>
  );
};

const Step1 = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>
        Por el momento los métodos de pago son mediante Bizum al número de
        teléfono indicado con tu GameId como asunto.
      </p>
      <h4 className="mb-8">690 000 000</h4>
      <p className="mb-8">Mediante PayPal en el siguiente enlace</p>
      <a
        className="text-color-low tt-underline"
        href="https://paypal.me/codJF?locale.x=es_ES"
        target="_blank"
        rel="noopener noreferrer"
      >
        PayPal COD_JF
      </a>
      <p className="mt-16">
        Una vez validado el pago apareceras inscrito en el torneo. Y tendrás
        acceso con tu GameId
      </p>
      <p className="text-color-low tt-underline">
        <span className="text-color-primary">*</span> Por qué de estos metodos
        de pago
      </p>
      <ButtonGroup className="mt-8">
        <Button
          tag="a"
          color="primary"
          size="sm"
          onClick={onConfirm}
          wideMobile
        >
          Confirmar
        </Button>
        <Button tag="a" size="sm" color="error" onClick={onCancel} wideMobile>
          Cancelar
        </Button>
      </ButtonGroup>
    </div>
  );
};

const StepFinal = () => {
  return (
    <div>
      <h1 className="text-color-high"> ¡ Felicidades estas inscrito !</h1>
      <h3 className="text-color-seconday"> Práctica ya queda poco </h3>
    </div>
  );
};

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
  const [hasTeam, setHasTeam] = useState(false);
  const [userPay, setUserPay] = useState(false);
  const [tourState, setTourState] = useState(tourStates.PROX);
  const [stats, setStats] = useState([]);
  const [userTeam, setUserTeam] = useState({});
  const globalState = useContext(store);
  const router = useRouter();
  const { state, dispatch } = globalState;
  console.log("state", state);

  const validUser = user && user.username && user.cod;

  const topDivider = true;

  const { tournament } = state;

  const checkUserTeam = () => {
    console.log("tournament", tournament);

    getUserTeamByTour(user.id, user.gameid, user.secondaryGameId, tournament.id).then((team) => {
      console.log("team", team);
      team.length > 0 && setUserTeam(team[0]);
    });
  };

  const checkUserPay = () => {
    const userTournament =
      user && user.tournaments.find((e) => e.tid === tournament.id);
    if (userTournament && userTournament.payed) setUserPay(true);
  };

  const loadTourStats = () => {
    getTournamentWithStats(tournament.id).then((tour) => {
      setTourState(tourStates.FINISHED);
      console.log("tour", tour);
      setStats(tour.stats);
    });
  };

  const checkTourFinish = () => {
    const now = new Date().getTime();
    const halfhour = 30 * 60 * 1000;
    if (tournament && now > tournament.fecha) {
      now - halfhour > tournament.fecha
        ? loadTourStats()
        : setTourState(tourStates.JUST_FINISH);
    }
  };

  useEffect(() => {
    if (
      user &&
      user.tournaments &&
      user.tournaments.filter((e) => e.tid === tournament.id).length > 0
    ) {
      setInscripcionDone(true);
      checkUserTeam();
    }
    checkUserPay();
    checkTourFinish();
  }, []);

  useEffect(() => {
    checkUserPay();
  }, [tournament]);

  const handleInscripcion = (e) => {
    e.preventDefault();
    setInscripcionModalActive(true);
  };

  const closeInscripcionModal = (e) => {
    e.preventDefault();
    setInscripcionModalActive(false);
    setHasTeam(false);
  };

  const handleConfirm = (e) => {
    console.log("Confirm");
    e.preventDefault();
    inscribeUserToTournament(user.id, tournament)
      .then(() => {
        inscribeTeam(userTeam).catch((e) => console.log("error$$$", e));
        setInscripcionDone(true);
      })
      .catch((e) => console.log("error", e));
  };

  const handleCancel = (e) => {
    closeInscripcionModal(e);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUserToTournament(user.id, tournament);
    if (userTeam.teamid) {
      const newTeam = userTeam;
      newTeam.users = newTeam.users.filter((elem) => elem.user !== user.id);
      inscribeTeam(newTeam);
      setUserTeam({});
    }
    setInscripcionDone(false);
    dispatch({ type: "tournament-deleteUser", value: user.id });
    router.push("/");
  };

  const handleTeamSelected = (team) => {
    setHasTeam(true);
    team.users.push({ user: user.id, gameid: user.gameid, secondaryGameId: user.secondaryGameId });
    setUserTeam(team);
  };

  const switchModalContent = () => {
    if (!hasTeam) {
      return (
        <SearchTeam
          tourid={tournament.id}
          tourModo={tournament.modo}
          onTeamSelected={handleTeamSelected}
        />
      );
    } else {
      if (!inscripcionDone)
        return <Step1 onConfirm={handleConfirm} onCancel={handleCancel} />;
      else return <StepFinal />;
    }
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
      {tournament && (
        <div className="container">
          <div className={innerClasses}>
            {tourState === tourStates.PROX && (
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
                      {userTeam && userTeam.users && (
                        <ul className="has-bg-color mt-16">
                          <h4 className="text-color-primary has-bottom-divider mb-0">
                            {userTeam.teamName}
                          </h4>
                          {userTeam.users.map((user) => (
                            <p className="text-color-low mt-0 mb-0">
                              {user.gameid}
                            </p>
                          ))}
                        </ul>
                      )}

                      <div className="borrarme-section">
                        <p className="text-xs mr-16">
                          Ya estas apuntado a este torneo
                        </p>
                        <Button
                          className=""
                          size="xxs"
                          color="error"
                          disabled={userPay}
                          onClick={handleDelete}
                        >
                          Borrarme
                        </Button>
                      </div>
                      <h4 className="mt-8">
                        Pago confirmado:
                        {userPay ? (
                          <CheckOk color="#24E5AF" />
                        ) : (
                          <CheckCroos color="#ff3146" />
                        )}
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
                  {switchModalContent()}
                </Modal>
              </div>
            )}
            {tourState === tourStates.JUST_FINISH && (
              <div>
                <p> Estamos esperando los resultados</p>
              </div>
            )}
            {stats && tourState === tourStates.FINISHED && (
              <div>
                <TourStats stats={stats} />
              </div>
            )}
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
                      {tournament.mapa}
                      <span className="text-color-low"> | </span>
                      {tournament.modo}
                      <span className="text-color-low"> | </span> k/d max:{" "}
                      {tournament.kdmax}
                    </h3>
                  )}
                  <p className="m-0">
                    Estas partidas, ganarán 1 punto por eliminación; con 20
                    puntos por una victoria, 15 por los 5 primeros, 10 por los
                    15 primero y 5 por los 25 primeros. El ganador será el
                    equipo con más puntos después de las 3 partidas privadas
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
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua — Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua — Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
      )}
    </section>
  );
}
