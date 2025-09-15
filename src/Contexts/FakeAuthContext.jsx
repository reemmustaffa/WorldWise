import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticted: false,
};
function reduce(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticted: true, user: action.payLoad };
    case "logout":
      return { ...state, isAuthenticted: false, user: null };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticted }, dispatch] = useReducer(reduce, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payLoad: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticted, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
