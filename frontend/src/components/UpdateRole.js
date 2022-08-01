import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function UpdateRole() {
  const {
    setUpdateRole,
    employeeDepInfo,
    setEmployeeDepInfo,
    updateNewRoleOnFrontend,
    loginInfo
  } = useContext(AppContext);

  const [newRole, setNewRole] = useState("");
  const [newRoleStartDate, setNewRoleStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewRole = (e) => {
    setNewRole(e.target.value);
  };

  const handleNewRoleStartDate = (e) => {
    setNewRoleStartDate(e.target.value);
  };

  const cancelUpdateRole = () => {
    setUpdateRole(false);
  };

  const handleRoleUpdate = async (ev) => {
    try {
      ev.preventDefault();
      const editEmployee = await axios.put("/hrManagers/editEmployeeRole", {
        empNum: employeeDepInfo.user.userInfo.emp_no,
        departmentNo: employeeDepInfo.deptInfo[0].departments.dept_no,
        originalRole: employeeDepInfo.titleInfo[0].title,
        newRole: newRole,
        newRoleStartDate: newRoleStartDate,
      });
      swal({
        title: "Success!",
        text: `${editEmployee.data}`,
        icon: "success",
        button: "continue!",
      });
      const newEmployeeInfo = { ...employeeDepInfo };
      newEmployeeInfo.titleInfo[0].to_date = newRoleStartDate;
      newEmployeeInfo.titleInfo.unshift({ emp_no: employeeDepInfo.user.userInfo.emp_no, title: newRole, from_date: newRoleStartDate, to_date: "9999-01-01" });
      setEmployeeDepInfo(newEmployeeInfo);
      updateNewRoleOnFrontend(employeeDepInfo.user.userInfo.emp_no, newRole);
      setUpdateRole(false);
    } catch (e) {
      swal({
        title: "Edit Employee Failed!",
        text: `${e.response}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Role History</h2>
        <div onClick={cancelUpdateRole} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleRoleUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.titleInfo[0].title}
              sx={{ margin: "20px" }}
              label="Current Role"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.titleInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Role Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField select size="small" required value={newRole} onChange={handleNewRole} sx={{ margin: "20px" }} label="New Role">
            {loginInfo.titlesList.map((title, index) => {
                return (
                  <MenuItem key={index} value={title.title}>
                    {title.title}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              size="small"
              required
              type="date"
              value={newRoleStartDate}
              onChange={handleNewRoleStartDate}
              sx={{ margin: "20px" }}
              label="New Role Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Role"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateRole;
