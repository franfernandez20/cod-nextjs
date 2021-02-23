import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "../../hooks/store";

import styles from "./card.module.css";
import classNames from "classnames";

import CheckOk from "./icons/checkOk";
import CheckCroos from "./icons/checkCross";

const diaSemana = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
];

const getRango = (level, modo) => {
  switch (true) {
    case value:
      break;

    default:
      break;
  }
};

const ranges = {
  DIAMANTE: {
    br_brduos: 6,
    br_brtrios: 9,
    br_brquads: 12,
  },
  PLATINO: {
    br_brduos: 4,
    br_brtrios: 6,
    br_brquads: 8,
  },
  ORO: {
    br_brduos: 2.4,
    br_brtrios: 3.6,
    br_brquads: 5,
  },
  PLATA: {
    br_brduos: NaN,
    br_brtrios: NaN,
    br_brquads: NaN,
  },
  BRONCE: {
    br_brduos: 0,
    br_brtrios: 0,
    br_brquads: 0,
  },
};

const LevelComponent = ({ kd, modo }) => {
  const [levelName, setLevelName] = useState("BRONCE");

  const getLevel = () => {
    switch (true) {
      case kd > ranges.DIAMANTE[modo]:
        setLevelName("DIAMANTE");
        break;
      case kd > ranges.PLATINO[modo]:
        setLevelName("PLATINO");
        break;
      case kd > ranges.ORO[modo]:
        setLevelName("ORO");
        break;
      case kd > ranges.PLATA[modo]:
        setLevelName("PLATA");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getLevel();
  }, []);
  return (
    <div className={classNames(styles.matchLeague, styles[levelName])}>
      <div className={styles.leagueTitle}>{levelName}</div>
    </div>
  );
};

const IsPayComponent = ({ inscribed }) => {
  return (
    <div
      className={classNames(
        styles.payComponent,
        inscribed ? styles.inscribed : styles.noInscribed
      )}
    >
      <div className={styles.leagueTitle}>
        {inscribed ? (
          <CheckOk color="#24E5AF" />
        ) : (
          <CheckCroos color="#ff3146" />
        )}
      </div>
    </div>
  );
};

const PremioComponent = ({ a }) => (
  <div className={styles.matchLeague}>
    <div className={styles.leagueTitle}>{a}€</div>
  </div>
);

const HighlightReward = ({ minReward }) => (
  <div className="premio__placement warzone loss">
    <div>Hasta</div>
    <div>
      <span>{minReward}€</span>
    </div>

    {/* <p>a css3 animation demo</p> */}
  </div>
);

export default function Card({ tournament }) {
  const router = useRouter();
  const [inscribedPayed, setInscribedPayed] = useState([false, false]);
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const {
    id,
    modo,
    kdmax,
    duration,
    highlight,
    minReward,
    prize,
    fecha,
    mapa,
    payed,
    topay,
    visible,
  } = tournament;
  const total = payed.length + topay.length;
  const { user } = state;

  useEffect(() => {
    if (user && user.tournaments) {
      const userTournament = user.tournaments.find((e) => e.tid === id);
      userTournament && setInscribedPayed([true, userTournament.payed]);
    } else setInscribedPayed([false, false]);
  }, [user]);

  const handleTournamentSelect = () => {
    dispatch({ type: "setTournament", value: tournament });
    router.push({
      pathname: "/tournaments/[id]",
      query: { id: tournament.id },
    });
  };

  return (
    <>
      {tournament && visible && (
        <li
          className="recentmatches-listing__item item-active card_basic"
          onClick={handleTournamentSelect}
        >
          <div className="recentmatches-listing__summary">
            <div className="match-details-list-component">
              <ul className="match-details-listing card_basic">
                <li className="match-details-listing__item warzone card_basic">
                  <div
                    className="match-details-listing__gameIcon"
                    style={{
                      backgroundImage:
                        'url("https://www.callofduty.com/cdn/app/icons/mw/modes/wz_br_brtrios.png")',
                    }}
                  ></div>
                  <div className="match-details-listing__content">
                    <div className="match-details-listing__timestamp">
                      <div className="fecha-content">
                        <p>{diaSemana[new Date(fecha).getDay()]}</p>
                        {new Date(fecha).toLocaleDateString()} |{" "}
                        {new Date(fecha).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="match-details-listing__map">
                      <span className="text-color-low mt-8">Duración: {duration} horas</span>
                    </div>
                    {inscribedPayed[0] && (
                      <div className="match-details-listing__timestamp">
                        <span className="text-xxs text-color-success">
                          Apuntado
                        </span>
                      </div>
                    )}
                    <div className="match-details-listing__map">
                      <span className="text-color-mid">{mapa}</span>
                    </div>
                    <div className="match-details-listing__mode">
                      BR - {modo}
                    </div>
                    <div className="match-details-listing__placement warzone loss">
                      <span className="text-color-success">{total}</span>
                      <span className="text-color-low">/150</span>
                    </div>
                    {highlight && <HighlightReward minReward={minReward}/>}
                  </div>
                </li>
              </ul>
            </div>
            <div className="match-stats-list-component">
              <ul className="match-stats-listing card_basic">
                <li className="match-stats-listing__item warzone card_basic">
                  <div className="match-stats-listing__title">Nivel</div>
                  <div className="match-stats-listing__stat">
                    <LevelComponent kd={kdmax} modo={modo} />
                  </div>
                </li>
                <li className="match-stats-listing__item warzone card_basic">
                  {inscribedPayed[0] && (
                    <>
                      <div className="match-stats-listing__title font-size-small-mobile">
                        Pago confirmado
                      </div>
                      <div className="match-stats-listing__stat">
                        <IsPayComponent inscribed={inscribedPayed[1]} />
                      </div>
                    </>
                  )}
                </li>
                <li className="match-stats-listing__item warzone card_basic">
                  <div className="match-stats-listing__title">Inscripción</div>
                  <div className="match-stats-listing__stat">
                    <PremioComponent a={prize} />
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="recentmatches-listing__bgimg"
              style={{
                backgroundImage:
                  'url("https://www.callofduty.com/cdn/app/base-maps/mw/mp_don3.jpg")',
              }}
            ></div>
          </div>
        </li>
      )}
    </>
  );
}
