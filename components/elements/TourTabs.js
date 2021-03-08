import classNames from "classnames";

const tabs = [
  {
    name: "Express",
    id: "express",
  },
  {
    name: "KillRace",
    id: "killrace",
  },
  {
    name: "Toppers",
    id: "top",
  },
];

export default function TourTabs({ format, onSelectedTab }) {

  const handleClickTab = (id) => (e) => {
    e.preventDefault();
    onSelectedTab(id);
  };
  return (
    <div className="tourtabs">
      <div className="layout">
        {tabs.map((tab) => (
          <label
            className={classNames(tab.id === format && "nav")}
            onClick={handleClickTab(tab.id)}
          >
            <span>{tab.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
