import styles from "../styles/EmployeeTable.module.css";
import { useState, useContext } from "react";
import { TextField, Typography, Pagination } from "@mui/material";
import { AppContext } from "./AppContext";
import axios from "axios";

function EmployeeTable({
  arrayToPaginate,
  paginatedArray,
  setPaginatedArray,
  paginationCount,
  paginationPage,
  setPaginationPage,
  manager,
  allColleagues,
}) {
  const {
    loginInfo,
    setAddEmployee,
    location,
    displayEmployeeDetails,
    setColleagueOffset,
    setPaginationCountEmployee,
    setPaginationEmployeeArray,
    setLoginInfo,
    colleagueOffset,
  } = useContext(AppContext);

  const [employeeName, setEmployeeName] = useState("");

  const handlePagination = (e) => {
    const pageNumber = JSON.parse(e.target.innerText);
    setPaginationPage(pageNumber);
    const spliceStart = (pageNumber - 1) * 10;
    const spliceEnd = spliceStart + 10;
    setPaginatedArray(arrayToPaginate.slice(spliceStart, spliceEnd));
  };

  const handleEmployeeName = (e) => {
    setEmployeeName(e.target.value);
  };

  const searchEmployeeByName = (e) => {
    e.preventDefault();
  };

  const toggleAddEmployee = () => {
    setAddEmployee(true);
  };

  const nextGroupOfColleagues = async (offset) => {
    try {
      setColleagueOffset(offset);
      const nextColleagueGroup = await axios.get(`/users/getNextGroupColleagues?offset=${offset}`);
      setPaginationCountEmployee(Math.ceil(nextColleagueGroup.data.length / 10));
      setPaginationEmployeeArray(nextColleagueGroup.data.slice(0, 10));
      const newLoginInfo = { ...loginInfo };
      newLoginInfo.colleagues = nextColleagueGroup.data;
      setLoginInfo(newLoginInfo);
      setPaginationPage(1);
    } catch (e) {
      console.log(e);
    }
  };

  const showNextEmployees = async () => {
    try {
      const newColleagueOffset = colleagueOffset + 1000;
      await nextGroupOfColleagues(newColleagueOffset);
    } catch (e) {
      console.log(e);
    }
  };

  const showPreviousEmployees = async () => {
    try {
      const newColleagueOffset = colleagueOffset - 1000;
      await nextGroupOfColleagues(newColleagueOffset);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.searchWrapper}>
        <h2 className={styles.header}>Employees</h2>
        <form onSubmit={searchEmployeeByName} className={styles.employeeSearch}>
          <TextField
            size="small"
            required
            type="text"
            value={employeeName}
            onChange={handleEmployeeName}
            InputLabelProps={{ style: { color: "#fff" } }}
            inputProps={{ style: { color: "#fff" } }}
            label="Search By Employee Name"
          />
          <button className={styles.search} type="submit">
            Search!
          </button>
          {loginInfo.user.accessibility === "managerHR" && location.pathname === "/organisation" && (
            <div onClick={toggleAddEmployee} className={styles.hrLink}>
              Add Employee
            </div>
          )}
        </form>
      </div>

      <Typography sx={{ color: "white" }}>Page: {paginationPage}</Typography>
      <div className={styles.table}>
        <div className={styles.employeeWrapper}>
          <div className={styles.tableHeader}>First Name</div>
          <div className={styles.tableHeader}>Last Name</div>
          <div className={styles.tableHeader}>Job Title</div>
          <div className={styles.tableHeader}>Start Date</div>
        </div>
        {paginatedArray.map((employee, index) => {
          return (
            <div
              key={index}
              className={manager ? styles.employeeWrapperManager : styles.employeeWrapper}
              {...(manager && { onClick: () => displayEmployeeDetails(`${employee.emp_no}`) })}
            >
              <div className={styles.tableInfo}>{employee.first_name}</div>
              <div className={styles.tableInfo}>{employee.last_name}</div>
              <div className={styles.tableInfo}>{employee.title.title}</div>
              <div className={styles.tableInfo}>{employee.hire_date}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.paginationWrapper}>
        {allColleagues && (
          <button disabled={colleagueOffset === 0} className={styles.paginationButton} onClick={showPreviousEmployees}>
            Show Previous
          </button>
        )}
        <Pagination
          hideNextButton={true}
          hidePrevButton={true}
          className={styles.pagination}
          count={paginationCount}
          defaultPage={paginationPage}
          page={paginationPage}
          onChange={(e) => handlePagination(e)}
        />
        {allColleagues && (
          <button disabled={colleagueOffset >= loginInfo.totalEmployeeCount} className={styles.paginationButton} onClick={showNextEmployees}>
            Show Next
          </button>
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;
