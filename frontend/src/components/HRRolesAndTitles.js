import styles from "../styles/DepartmentsTable.module.css";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function HRRolesAndTitles() {
  const { loginInfo, setAddTitle } = useContext(AppContext);

  const toggleAddTitle = () => {
    setAddTitle(true);
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Titles</h2>
        <div onClick={toggleAddTitle} className={styles.hrLink}>
          Add Title
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.departmentWrapper}>
          <div className={styles.tableHeader}>Title</div>
          <div className={styles.tableHeader}>Action</div>
        </div>
        {loginInfo.titlesList.map((title, index) => {
          return (
            <div key={index} className={styles.titleWrapper}>
              <div className={styles.tableInfo}>{title.title}</div>
              <div className={styles.tableInfo}>e</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HRRolesAndTitles;
