// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  user: undefined,
  tournament: undefined,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState = {};
    switch (action.type) {
      case "action description":
        newState = { succes: "yes" }; // do something with the action
        return newState;
      case "update":
        newState = { ...state, ...action.value };
        return newState;
      case "setUser":
        const user = { ...action.value };
        newState = { ...state, user };
        // state.user = user
        return newState;
      case "setTournament":
        const tournament = { ...action.value };
        newState = { ...state, tournament };
        return newState;
      case "tournament-deleteUser":
        // debugger;
        const { topay } = state.tournament;
        const idx = topay.indexOf(action.value);
        if (idx > -1) {
          const newTopay = topay.splice(idx, 1);
          const tournament = { ...state.tournament, topay: newTopay };
          newState = { ...state, tournament };
          return newState;
        } else return state;
      case "init":
        return {};
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
