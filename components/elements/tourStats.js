import classNames from "classnames";
import UserIcon from "./icons/userIcon";

const defaultProps = {
  statsOne: {},
  statsFive: [],
  statsTen: [],
  statsTwenty: [],
  stats: [],
};

const TourStats = ({
  className,
  stats,
  statsOne,
  statsFive,
  statsTen,
  statsTwenty,
  ...props
}) => {
  // const classes = classNames("button-group", className);

  const getClassesBox = (idx) => {
    switch (idx) {
      case 0:
        return ["box-win"];
      case 1:
        return ["box-others", "box-second"];
      case 2:
        return ["box-others", "box-third"];
      default:
        return ["box-others"];
    }
  };
  const getClassesLabel = (idx) =>
    idx === 0
      ? "stat-summary-listing__label_winner"
      : "stat-summary-listing__label";
  const getClassesStat = (idx) =>
    idx === 0
      ? "stat-summary-listing__stat_winner"
      : "stat-summary-listing__stat";

  return (
    <>
      <div className="tourstats">
        {stats.map((stat, idx) => {
          return (
            <div className={"wrapper-winner"}>
              <div
                className={classNames(
                  "winner",
                  "stat-summary-component",
                  ...getClassesBox(idx)
                )}
              >
                <div className="team-user-box">
                  {/* <div className="team-users">
                    <strong className="text-xxs text-color-low">|</strong>
                    {stat.matches[0].id.map((userName) => {
                      return (
                        <span>
                          {userName}{" "}
                          <strong className="text-xxs text-color-low">|</strong>
                        </span>
                      );
                    })}
                  </div> */}
                </div>
                <div class="stat-summary__wrapper">
                  <ul class="stat-summary-listing stat-summary__left">
                    <li class="stat-summary-listing__item">
                      {stat.matches[0].id.map((userName) => {
                        return (
                        <div className="user-wrapper">
                          <UserIcon fill="black" className={idx === 0 ? "user-icon-winner" : "user-icon"}/> 
                          <p className={idx === 0 ? "winners" : "users"}>
                            {userName}
                          </p>
                        </div>
                        );
                      })}
                    </li>
                    <li class="stat-summary-listing__item">
                      <div className={classNames(getClassesLabel(idx))}>
                        Posición
                      </div>
                      <div class={getClassesStat(idx)}>{idx + 1}º</div>
                    </li>
                    <li class="stat-summary-listing__item">
                      <div class={classNames(getClassesLabel(idx))}>Puntos</div>{" "}
                      <div class={getClassesStat(idx)}>
                        {stat.totalTourPoints}
                      </div>
                    </li>{" "}
                    {stat.matches.map((match) => {
                      return (
                        <li class="stat-summary-listing__item">
                          <div class={classNames(getClassesLabel(idx))}>
                            Puntos | Puesto
                          </div>
                          <div class={getClassesStat(idx)}>
                            <span className="item-left">
                              {match.totalTeamPoints}
                            </span>
                            <span className="item-right">
                              {match.team[0].teamPlacement}º
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {/* <ul class="stat-summary-listing stat-summary__right">
                <li class="stat-summary-listing__item">
                  <div class="stat-summary-listing__label">Victorias</div>{" "}
                  <div class="stat-summary-listing__stat mw mp">1</div>
                </li>{" "}
                <li class="stat-summary-listing__item">
                  <div class="stat-summary-listing__label">Derrotas</div>{" "}
                  <div class="stat-summary-listing__stat mw mp">1</div>
                </li>{" "}
                <li class="stat-summary-listing__item">
                  <div class="stat-summary-listing__label">Prop. V/D</div>{" "}
                  <div class="stat-summary-listing__stat mw mp">1.00</div>
                </li>{" "}
                <li class="stat-summary-listing__item">
                  <div class="stat-summary-listing__label">Partidas</div>{" "}
                  <div class="stat-summary-listing__stat mw mp">6</div>
                </li>
              </ul> */}
                </div>
              </div>
            </div>
          );
        })}

        <div className="wrapper-five">
          {statsFive.map((team) => (
            <div className="box five">
              {team.name} |{team.totalTeamPoints}
            </div>
          ))}
        </div>

        {/* <div className="wrapper-ten">
          {statsTen.map((team) => (
            <div className="box ten">
              {team.name} |{team.totalTeamPoints}
            </div>
          ))}
        </div> */}
        {/* <div className="box twenty"></div> */}
      </div>
    </>
  );
};

TourStats.defaultProps = defaultProps;
export default TourStats;
