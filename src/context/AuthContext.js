import { createContext, useEffect, useReducer } from "react";
import { authorizeProject } from "../firebase/config";
import defaultProfilePhoto from "../assets/profile-icon.svg";

export const AuthContext = createContext();

const OPTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  CREATE: "create",
  CHANGENAME: "changename",
  CHANGECOPYNAME: "changecopyname",
  AUTHISREADY: "authisready",
  CHANGEPROFILEPHOTO: "changeprofilephoto",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case OPTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        name: action.payload.displayName,
        email: action.payload.email,
        isFirstTime: false,
      };
    case OPTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        name: null,
        email: null,
        isFirstTime: false,
      };
    case OPTIONS.CREATE:
      return {
        ...state,
        user: action.payload,
        name: action.payload.displayName,
        email: action.payload.email,
        isFirstTime: true,
      };
    case OPTIONS.TOGGLEPOPUP:
      return {
        ...state,
        [action.payload + "PopUpOpen"]: !state[action.payload + "PopUpOpen"],
      };
    case OPTIONS.CHANGENAME:
      return { ...state, name: action.payload };
    case OPTIONS.CHANGECOPYNAME:
      return { ...state, copyOfName: action.payload };
    case OPTIONS.AUTHISREADY:
      return {
        ...state,
        authIsReady: true,
        user: action.payload,
        name: action.payload.displayName,
        profilePhotoURL: action.payload.photoURL || defaultProfilePhoto,
        cursor: "default",
      };
    case OPTIONS.CHANGEPROFILEPHOTO:
      return { ...state, profilePhotoURL: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    name: null,
    email: null,
    password: null,
    isFirstTime: false,
    profilePopUpOpen: false,
    passwordPopUpOpen: false,
    copyOfName: null,
    profilePhotoURL: defaultProfilePhoto,
    cursor: "progress",
  });

  useEffect(async () => {
    const unsub = await authorizeProject.onAuthStateChanged((user) => {
      dispatch({ type: OPTIONS.AUTHISREADY, payload: user });
      unsub();
      console.log(
        "Display Name:",
        user.displayName,
        user,
        user.photoURL,
        state.profilePhotoURL
      );
    });
  }, []);

  const login = (user) => {
    dispatch({ type: OPTIONS.LOGIN, payload: user });
  };

  const logout = () => {
    dispatch({ type: OPTIONS.LOGOUT });
  };

  const create = (user) => {
    dispatch({ type: OPTIONS.CREATE, payload: user });
  };

  const togglePopUp = (popup) => {
    dispatch({ type: OPTIONS.TOGGLEPOPUP, payload: popup });
  };

  const changeName = (name) => {
    dispatch({ type: OPTIONS.CHANGENAME, payload: name });
  };

  const changeCopyName = (name) => {
    dispatch({ type: OPTIONS.CHANGECOPYNAME, payload: name });
  };

  const changeProfilePhoto = (photoURL) => {
    dispatch({ type: OPTIONS.CHANGEPROFILEPHOTO, payload: photoURL });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        create,
        togglePopUp,
        changeName,
        changeCopyName,
        changeProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
