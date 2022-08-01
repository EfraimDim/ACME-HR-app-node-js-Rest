import styles from "../styles/NavBar.module.css";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Logo from "../styles/images/ACMELogo.png";

function NavBar() {
  const { loginInfo, location } = useContext(AppContext);

  return (
    <nav className={styles.navBar}>
      <img className={styles.logo} src={Logo} alt="ACME HR" />
      <div className={styles.avatarWrapper}>
        <Avatar sx={{ bgcolor: "#0000cd", marginLeft: "0.5rem" }}>
          {loginInfo.user.userInfo.first_name.charAt(0)}
          {loginInfo.user.userInfo.last_name.charAt(0)}
        </Avatar>
        <div className={styles.usersName}>
          {loginInfo.user.userInfo.first_name} {loginInfo.user.userInfo.last_name}
        </div>
      </div>
      <Link className={styles.link} to="/">
        <div className={location.pathname === "/" ? styles.sideBarButtonSelected : styles.sideBarButtons}>Colleagues</div>
      </Link>
      <Link className={styles.link} to="/information">
        <div className={location.pathname === "/information" ? styles.sideBarButtonSelected : styles.sideBarButtons}>My Information</div>
      </Link>
      {loginInfo.user.accessibility !== "regularEmp" && (
        <Link className={styles.link} to="/department">
          <div className={location.pathname === "/department" ? styles.sideBarButtonSelected : styles.sideBarButtons}>My Department</div>
        </Link>
      )}
      {loginInfo.user.accessibility === "managerHR" && (
        <Link className={styles.link} to="/organisation">
          <div className={location.pathname === "/organisation" ? styles.sideBarButtonSelected : styles.sideBarButtons}>My Organisation</div>
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
