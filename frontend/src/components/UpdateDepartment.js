import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function UpdateDepartment() {
  const { setUpdateDepartment, employeeDepInfo, setEmployeeDepInfo, loginInfo } = useContext(AppContext);

  const [newDepartment, setNewDepartment] = useState(employeeDepInfo.deptInfo[0].departments.dept_no);
  const [newDepartmentStartDate, setNewDepartmentStartDate] = useState(new Date().toISOString().split("T")[0]);

  const handleNewDepartment = (e) => {
    setNewDepartment(e.target.value);
  };

  const handleNewDepartmentStartDate = (e) => {
    setNewDepartmentStartDate(e.target.value);
  };

  const cancelUpdateDepartment = () => {
    setUpdateDepartment(false);
  };

  const handleDepartmentUpdate = async (ev) => {
    try {
      ev.preventDefault();
      const editEmployee = await axios.put("/hrManagers/editEmployeeDepartment", {
        empNum: employeeDepInfo.user.userInfo.emp_no,
        newDepartmentNo: newDepartment,
        newDepartmentStartDate: newDepartmentStartDate,
      });
      swal({
        title: "Success!",
        text: `${editEmployee.data}`,
        icon: "success",
        button: "continue!",
      });
      const newEmployeeInfo = { ...employeeDepInfo };
      newEmployeeInfo.deptInfo[0].dept_emp.to_date = newDepartmentStartDate;
      const departmentName = loginInfo.deptWithManagersList.filter((depart) => depart.department.dept_no === newDepartment);
      newEmployeeInfo.deptInfo.unshift({
        departments: { dept_name: departmentName[0].department.dept_no__dept_name, dept_no: departmentName[0].department.dept_no },
        dept_emp: { emp_no: employeeDepInfo.user.userInfo.emp_no, dept_no: newDepartment, from_date: newDepartmentStartDate, to_date: "9999-01-01" },
      });
      setEmployeeDepInfo(newEmployeeInfo);
      setUpdateDepartment(false);
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
        <h2 className={styles.header}>Department History</h2>
        <div onClick={cancelUpdateDepartment} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleDepartmentUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].departments.dept_name}
              sx={{ margin: "20px" }}
              label="Current Department"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].dept_emp.from_date}
              sx={{ margin: "20px" }}
              label="Current Role Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField
              select
              size="small"
              required
              sx={{ margin: "20px" }}
              value={newDepartment}
              label="New Department"
              onChange={handleNewDepartment}
            >
              {loginInfo.deptWithManagersList.map((dept, index) => {
                return (
                  <MenuItem key={index} value={dept.department.dept_no}>
                    {dept.department.dept_no__dept_name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              size="small"
              required
              type="text"
              value={newDepartmentStartDate}
              onChange={handleNewDepartmentStartDate}
              sx={{ margin: "20px" }}
              label="New Department Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Department"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateDepartment;
