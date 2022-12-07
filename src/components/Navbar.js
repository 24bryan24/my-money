import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { authorizeProject } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import styles from "./Navbar.module.css";
import ProfilePopUp from "./ProfilePopUp";

export default function Navbar() {
  // const [isDoneRendered, setIsDoneRendered] = useState(false)
  const {
    user,
    isFirstTime,
    name,
    login,
    logout,
    togglePopUp,
    changeCopyName,
    authIsReady,
    profilePopUpOpen,
    profilePhotoURL,
  } = useAuthContext();
  const { logMeOut } = useLogout();
  const [copyUserData, setCopyUserData] = useState(user);

  //   useEffect(async () => {
  //     await authorizeProject.onAuthStateChanged(user => {
  //   if (user) {
  //     login(user)
  //     // changeProfilePhoto()
  //   } else {
  //     logout()
  //   }
  //   // setIsDoneRendered(true)
  // });
  //   },[])

  // const handleLogOut = () => {
  //   logMeOut()
  //   setIsDoneRendered(true)
  // }

  const handleClick = () => {
    console.log(copyUserData);
    changeCopyName(name);
    togglePopUp("profile");
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoney App</Link>
        </li>
        {user ? (
          <>
            <p>
              {isFirstTime ? "Hello there, " : "Welcome back, "}
              {name}
            </p>
            <li>
              <button className="btn" onClick={logMeOut}>
                Logout
              </button>
            </li>
            <img
              className={styles.profilePic}
              src={profilePhotoURL}
              onClick={handleClick}
            />
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        )}
        {profilePopUpOpen && (
          <ProfilePopUp copyUserData={copyUserData} popup="profile" />
        )}
      </ul>
    </nav>
  );
}
