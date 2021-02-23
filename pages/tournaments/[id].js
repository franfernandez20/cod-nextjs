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

const SearchTeam = ({
  tourid,
  userKD,
  tourMaxKD,
  tourModo,
  onTeamSelected,
}) => {
  const [searchModal, setSearchModal] = useState(true);
  const [createModalActive, setCreateModalActive] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamsFound, setTeamsFound] = useState([]);
  const [registroError, setRegistroError] = useState("");

  const handleGameIdChange = (e) => {
    e.preventDefault();
    e && e.target && setTeamName(e.target.value);
  };

  const handleRegistroSubmit = (e) => {
    e && e.preventDefault();
    setRegistroError("");
    setTeamsFound([]);

    if (searchModal)
      getTeamByName(teamName, tourid).then((result) => {
        result.length === 0
          ? setRegistroError("No se encontró el Team")
          : setTeamsFound(result);
      });
    else if (userKD > tourMaxKD * 0.4) {
      setRegistroError("Superas el K/D para apuntarte a este torneo");
    } else setCreateModalActive(true);
  };

  const handleSelectTeam = (team) => (e) => {
    e && e.preventDefault();
    if (teamComplete(team.users.length)) {
      setRegistroError("Este equipo esta completo");
    } else if (team.teamKD + userKD > tourMaxKD) {
      setRegistroError(
        "No puedes unirte a este equipo, superaís el K/D máximo"
      );
    } else {
      onTeamSelected(team);
    }
  };

  const handleCreateTeam = (e) => {
    e && e.preventDefault();
    onTeamSelected({ teamName: teamName, teamKD: 0, tourid, users: [] });
  };
  const closeCreateModal = (e) => {
    e && e.preventDefault();
    setTeamName("");
    setCreateModalActive(false);
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
        {registroError && <p className="text-color-error"> {registroError}</p>}
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
          <Modal show={createModalActive} handleClose={closeCreateModal}>
            <p className="mb-8 text-sm">Vas a crear un nuevo Team</p>
            <h4 className="mt-0">{teamName}</h4>
            <Button
              className="mr-8"
              tag="a"
              color="primary"
              size="sm"
              onClick={handleCreateTeam}
            >
              Confirmar
            </Button>
            <Button tag="a" size="sm" color="error" onClick={closeCreateModal}>
              Cancelar
            </Button>
          </Modal>
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

    getUserTeamByTour(
      user.id,
      user.gameid,
      user.secondaryGameId,
      tournament.id
    ).then((team) => {
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
      tour.stats && tour.stats.length > 0 && setTourState(tourStates.FINISHED);
      console.log("tour", tour);
      setStats(tour.stats);
    });
  };

  const checkTourFinish = () => {
    const now = new Date().getTime();
    const halfhour = 30 * 60 * 1000;
    if (tournament && now > tournament.fecha) {
      setTourState(tourStates.JUST_FINISH);
      now - halfhour > tournament.fecha && loadTourStats();
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
    team.users.push({
      user: user.id,
      gameid: user.gameid,
      secondaryGameId: user.secondaryGameId,
    });
    team.teamKD = team.teamKD + user.cod.kdRatio;
    setUserTeam(team);
  };

  const switchModalContent = () => {
    if (!hasTeam) {
      return (
        <SearchTeam
          tourid={tournament.id}
          tourModo={tournament.modo}
          tourMaxKD={tournament.kdmax}
          userKD={user.cod && user.cod.kdRatio}
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

  const svgItem = (
    <svg
      width="16"
      height="12"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-description"
    >
      <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
    </svg>
  );

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
                            <p
                              key={user.gameid}
                              className="text-color-low mt-0 mb-0"
                            >
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
                  {user && switchModalContent()}
                </Modal>
              </div>
            )}
            {stats && tourState === tourStates.FINISHED && (
              <div>
                <TourStats stats={stats} />
              </div>
            )}
            {tourState === tourStates.JUST_FINISH && (
              <div>
                <h3 className="ta-c">
                  Estamos calculando los resultados del torneo
                </h3>
                <h4 className="ta-c text-color-primary">¡Danos un minuto!</h4>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
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
                      <span className="text-color-low"> | </span> Duración:{" "}
                      {tournament.duration} horas
                    </h3>
                  )}
                  <div className="tour-description">
                    <p className="tittle">Sitema de puntuación:</p>
                    <ul>
                      <li></li>
                      <li>{svgItem}1 punto por kill.</li>
                      <li>{svgItem}30 ptos por una victoria.</li>
                      <li>{svgItem}20 ptos por ser segundos.</li>
                      <li>{svgItem}15 ptos por los 5 primeros.</li>
                      <li>{svgItem}10 ptos por los 10 primeros.</li>
                      <li>{svgItem}5 ptos por los 20 primeros.</li>
                    </ul>
                    <p className="text-color-high mb-0">
                      El ganador será el equipo con más puntos sumando sus 3
                      mejores partidas.
                    </p>
                  </div>
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
