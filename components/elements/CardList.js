import classNames from "classnames";
import Card from "./Card";

export default function CardList({ alt, src, text, list }) {
  return (
    <section className="cards_container">
      <div className="player-page main-content-inner inner-wrapper">
        <div className="recent-matches-container">
          <div className="recentmatches-page">
            <div className="page-wrapper recentmatches-last-matches">
              <div className="page-wrapper recentmatches-last-matches">
                <ul className="recentmatches-listing card_basic">
                  {list &&
                    list.map((tournament) => (
                      <Card key={tournament.id} tournament={tournament} />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// "display: block; overflow: hidden; border: 0px; margin: 0px; inset: '0px', height: '100%', width: '100%', position: 'absolute', pointer-events: 'none', z-index: '-1'"
