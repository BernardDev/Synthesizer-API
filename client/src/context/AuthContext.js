import {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [apiKey, setApiKey] = useState(null); // move it to a dedicated component

  return (
    <AuthContext.Provider value={{apiKey: apiKey, setApiKey: setApiKey}}>
      {props.children}
    </AuthContext.Provider>
  );
}
