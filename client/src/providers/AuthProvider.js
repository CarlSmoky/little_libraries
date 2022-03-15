const { useState, createContext } = require("react");

export const authContext = createContext();

const AuthProvider = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = (id, firstName, lastName, username, phoneNumber, email) => {
    const user = {
      id,
      firstName,
      lastName,
      email};
    setAuth(true);
    setUser(user);
  };

  const logout = () => {
    setAuth(false);
    setUser(null);
  };

  const provideData = { auth, user, login, logout };

  return (
    <authContext.Provider value={provideData}>
      {props.children}
    </authContext.Provider>
  );

};

export default AuthProvider;