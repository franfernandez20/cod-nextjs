// store.js
import React, {createContext, useReducer} from 'react';

const initialState = {
    user: undefined,

};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = {}
    switch(action.type) {
      case 'action description':
        newState = { succes: 'yes'}// do something with the action
        return newState;
      case 'update':
        newState = { ...state, ...action.value}// do something with the action
        return newState;
      case 'setUser':
        const user = { ...action.value}// do something with the action
        const newState = { ...state, user }
        // state.user = user 
        return newState;
      case 'init':
        return {};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }