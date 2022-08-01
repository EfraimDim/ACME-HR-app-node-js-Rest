import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function UpdateSalary() {
  const { setUpdateSalary, employeeDepInfo, setPaginationSalaryArrayDepEmp } = useContext(AppContext);

  const [newSalary, setNewSalary] = useState("");
  const [newSalaryStartDate, setNewSalaryStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewSalary = (e) => {
    setNewSalary(e.target.value);
  };

  const handleNewSalaryStartDate = (e) => {
    setNewSalaryStartDate(e.target.value);
  };

  const cancelUpdateSalary = () => {
    setUpdateSalary(false);
  };

  const handleSalaryUpdate = async (ev) => {
    try {
      ev.preventDefault();
      const editEmployee = await axios.put("/hrManagers/editEmployeeSalary", {
        empNum: employeeDepInfo.user.userInfo.emp_no,
        newSalary: newSalary,
        newSalaryStartDate: newSalaryStartDate,
      });
      swal({
        title: "Success!",
        text: `${editEmployee.data}`,
        icon: "success",
        button: "continue!",
      });
      const newEmployeeInfo = { ...employeeDepInfo };
      newEmployeeInfo.salaryInfo[0].to_date = newSalaryStartDate;
      newEmployeeInfo.salaryInfo.unshift({
        emp_no: employeeDepInfo.user.userInfo.emp_no,
        salary: newSalary,
        from_date: newSalaryStartDate,
        to_date: "9999-01-01",
      });
      setPaginationSalaryArrayDepEmp(newEmployeeInfo.salaryInfo);
      setUpdateSalary(false);
    } catch (e) {
      swal({
        title: "Edit Employee Failed!",
        text: `${e.response.data}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Salary History</h2>
        <div onClick={cancelUpdateSalary} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleSalaryUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.salaryInfo[0].salary}
              sx={{ margin: "20px" }}
              label="Current Salary"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.salaryInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Salary Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField size="small" required type="text" value={newSalary} onChange={handleNewSalary} sx={{ margin: "20px" }} label="New Salary" />
            <TextField
              size="small"
              required
              type="text"
              value={newSalaryStartDate}
              onChange={handleNewSalaryStartDate}
              sx={{ margin: "20px" }}
              label="New Salary Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Salary"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateSalary;
