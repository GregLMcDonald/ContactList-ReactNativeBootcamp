let state = {
  isFetchingContacts: true,
  isFetchingUser: true,
  contacts: [],
  user: {},
  error: false,
};

const listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  },
  onChange(newListener, debuggingMsg) {

    listeners.push(newListener);

    return () => { 



      listeners = listeners.filter( listener => listener !== newListener ); 
      
      console.log( '#listeners = ', listeners.length);
    
    };
  },
};
