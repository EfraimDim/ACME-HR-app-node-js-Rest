import { useContext } from "react";
import { AppContext } from "./AppContext";
import styles from "../styles/RoleDepartmentToggle.module.css";

function RoleDepartmentToggle() {
  const { roleDepartmentToggle, setRoleDepartmentToggle, loginInfo, location, setUpdateRole, setUpdateDepartment } =
    useContext(AppContext);

  const toggleRoleHistory = () => {
    setRoleDepartmentToggle(true);
  };
  const toggleDepartmentHistory = () => {
    setRoleDepartmentToggle(false);
  };
  const toggleUpdateRole = () => {
    setUpdateRole(true);
  };
  const toggleUpdateDepartment = () => {
    setUpdateDepartment(true);
  };
  return (
    <div className={styles.toggleWrapper}>
      <h2 onClick={toggleRoleHistory} className={roleDepartmentToggle ? styles.active : styles.unActive}>
        Role History
      </h2>
      <h2 onClick={toggleDepartmentHistory} className={!roleDepartmentToggle ? styles.active : styles.unActive}>
        Department History
      </h2>
      {roleDepartmentToggle && loginInfo.user.accessibility === "managerHR" && location.pathname === "/organisation" && (
        <div onClick={toggleUpdateRole} className={styles.hrLink}>Update Role</div>
      )}
      {!roleDepartmentToggle && loginInfo.user.accessibility === "managerHR" && location.pathname === "/organisation" && (
        <div onClick={toggleUpdateDepartment} className={styles.hrLink}>Update Department</div>
      )}
    </div>
  );
}

export default RoleDepartmentToggle;
