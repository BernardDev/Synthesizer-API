import {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey')); // move it to a dedicated component

  function saveKey(key) {
    setApiKey(key);
    localStorage.setItem('apiKey', key);
  }

  return (
    <AuthContext.Provider
      value={{apiKey: apiKey, setApiKey: setApiKey, saveKey: saveKey}}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
