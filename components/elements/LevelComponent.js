import { useEffect, useState } from "react";
import styles from "./card.module.css";
import classNames from "classnames";

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

export default LevelComponent;
