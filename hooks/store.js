// store.js
import React, {createContext, useReducer} from 'react';

const initialState = {
    user: undefined,
    tournament: undefined
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState = {}
    switch(action.type) {
      case 'action description':
        newState = { succes: 'yes'}// do something with the action
        return newState;
      case 'update':
        newState = { ...state, ...action.value}// do something with the action
        return newState;
      case 'setUser':
        const user = { ...action.value}// do something with the action
        newState = { ...state, user }
        // state.user = user 
        return newState;
      case 'setTournament':
        const tournament = { ...action.value}// do something with the action
        newState = { ...state, tournament }
        return newState;
      case 'tournament-deleteUser':
        const { topay } = state.tournament
        const idx = topay.indexOf(action.value)
        if (idx > -1) {
            const newTopay = topay.splice(idx, 1)
            const tournament = { ...tournament, topay: newTopay }// do something with the action
            newState = { ...state, tournament }
            return newState;
        } else return state;
      case 'init':
        return {};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }