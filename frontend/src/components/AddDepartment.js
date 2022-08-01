import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function AddDepartment() {
  const { setAddDepartment, loginInfo, setLoginInfo, updateNewRoleOnFrontend, myOrganisation } = useContext(AppContext);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentNumber, setNewDepartmentNumber] = useState(
    parseInt(myOrganisation.at(-1).department.dept_no.slice(-3)) + 1
  );
  const [managersEmpNum, setManagersEmpNum] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewDepartmentName = (e) => {
    setNewDepartmentName(e.target.value);
  };

  const handleNewDepartmentNumber = (e) => {
    setNewDepartmentNumber(e.target.value);
  };

  const handleManagersEmpNum = (e) => {
    setManagersEmpNum(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const cancelAddDepartment = () => {
    setAddDepartment(false);
  };

  const handleAddDepartment = async (ev) => {
    try {
      ev.preventDefault();
      const addDepartment = await axios.post("/hrManagers/addDepartment", {
        deptNo: `d0${newDepartmentNumber}`,
        deptName: newDepartmentName,
        managersEmpNum: managersEmpNum,
        startDate: startDate,
      });
      swal({
        title: "Success!",
        text: `${addDepartment.data.message}`,
        icon: "success",
        button: "continue!",
      });
      const newLoginInfo = { ...loginInfo };
      newLoginInfo.deptWithManagersList.push({
        department: { dept_no: `d0${newDepartmentNumber}`, dept_no__dept_name: newDepartmentName, total: '1' },
        manager: { dept_no: `d0${newDepartmentNumber}`, emp_no: parseInt(managersEmpNum), emp_no__first_name: addDepartment.data.newManager.first_name, emp_no__last_name: addDepartment.data.newManager.last_name },
      });
      setLoginInfo(newLoginInfo);
      updateNewRoleOnFrontend(parseInt(managersEmpNum), "Manager");
      setAddDepartment(false);
    } catch (e) {
      swal({
        title: "Add Department Failed!",
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
        <h2 className={styles.header}>Add Department</h2>
        <div onClick={cancelAddDepartment} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleAddDepartment}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              value={newDepartmentName}
              onChange={handleNewDepartmentName}
              sx={{ margin: "20px" }}
              label="Department Name"
            />
            <TextField
              size="small"
              disabled={true}
              required
              type="text"
              value={`d0${newDepartmentNumber}`}
              onChange={handleNewDepartmentNumber}
              sx={{ margin: "20px" }}
              label="Department Number"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              value={managersEmpNum}
              onChange={handleManagersEmpNum}
              sx={{ margin: "20px" }}
              label="Managers Employee Number"
            />
            <TextField size="small" required type="date" value={startDate} onChange={handleStartDate} sx={{ margin: "20px" }} label="Starting Date" />
          </div>
        </div>
        <input className={styles.hrLink} value={"Add Department"} type="submit" />
      </form>
    </div>
  );
}

export default AddDepartment;
