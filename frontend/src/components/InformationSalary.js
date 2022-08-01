import styles from "../styles/InformationSalary.module.css";
import { Typography, Pagination } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function InformationSalary({ arrayToPaginate, paginatedArray, setPaginatedArray, paginationCount, paginationPage, setPaginationPage }) {
  const { loginInfo, location, setUpdateSalary } = useContext(AppContext);

  const handlePagination = (e) => {
    const pageNumber = JSON.parse(e.target.innerText);
    setPaginationPage(pageNumber);
    const spliceStart = (pageNumber - 1) * 10;
    const spliceEnd = spliceStart + 10;
    setPaginatedArray(arrayToPaginate.slice(spliceStart, spliceEnd));
  };

  const toggleUpdateSalary = () => {
    setUpdateSalary(true);
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Salary History</h2>
        {loginInfo.user.accessibility === "managerHR" && location.pathname === "/organisation" && (
          <div onClick={toggleUpdateSalary} className={styles.hrLink}>
            Update Salary
          </div>
        )}
      </div>
      <Typography sx={{ color: "white" }}>Page: {paginationPage}</Typography>
      <div className={styles.table}>
        <div className={styles.infoWrapper}>
          <div className={styles.tableHeader}>Salary</div>
          <div className={styles.tableHeader}>Salary Start Date</div>
          <div className={styles.tableHeader}>Salary End Date</div>
        </div>
        {paginatedArray.map((salary, index) => {
          return (
            <div key={index} className={styles.infoWrapper}>
              <div className={styles.tableInfo}>${salary.salary}</div>
              <div className={styles.tableInfo}>{salary.from_date}</div>
              <div className={styles.tableInfo}>{salary.to_date}</div>
            </div>
          );
        })}
      </div>
      <Pagination
        hideNextButton={true}
        hidePrevButton={true}
        className={styles.pagination}
        count={paginationCount}
        defaultPage={paginationPage}
        page={paginationPage}
        onChange={(e) => handlePagination(e)}
      />
    </div>
  );
}

export default InformationSalary;
