import styles from "../styles/AddEmployee.module.css";
import { TextField, MenuItem } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function AddAndEditEmployeeForm({
  handleSubmit,
  firstName,
  lastName,
  gender,
  birthDate,
  empNum,
  role,
  department,
  hireDate,
  handleFirstName,
  handleLastName,
  handleGender,
  handleBirthDate,
  handleEmpNum,
  handleRole,
  handleDepartment,
  handleHireDate,
  addEmployee,
  salary,
  handleSalary,
}) {
  const { loginInfo, myOrganisation } = useContext(AppContext);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField size="small" required type="text" value={firstName} onChange={handleFirstName} sx={{ margin: "20px" }} label="First Name" />
            <TextField size="small" required type="text" value={lastName} onChange={handleLastName} sx={{ margin: "20px" }} label="Last Name" />
            <TextField select size="small" required type="text" value={gender} onChange={handleGender} sx={{ margin: "20px" }} label="Gender">
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
            </TextField>
            <TextField size="small" required type="date" value={birthDate} onChange={handleBirthDate} sx={{ margin: "20px" }} label="Birth Date" />
            {addEmployee && (
              <TextField size="small" required type="text" value={salary} onChange={handleSalary} sx={{ margin: "20px" }} label="Starting Salary" />
            )}
          </div>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              value={empNum}
              disabled={addEmployee ? false : true}
              onChange={handleEmpNum}
              sx={{ margin: "20px" }}
              label="Employee Number"
            />
            <TextField select size="small" required value={role} onChange={handleRole} sx={{ margin: "20px" }} label="Current Role">
              {loginInfo.titlesList.map((title, index) => {
                return (
                  <MenuItem key={index} value={title.title}>
                    {title.title}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField select size="small" required sx={{ margin: "20px" }} value={department} label="Current Department" onChange={handleDepartment}>
              {myOrganisation.map((dept, index) => {
                return (
                  <MenuItem key={index} value={dept.department.dept_no}>
                    {dept.department.dept_no__dept_name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField size="small" required type="date" value={hireDate} onChange={handleHireDate} sx={{ margin: "20px" }} label="Hire Date" />
          </div>
        </div>
        <input className={styles.hrLink} value={addEmployee ? "Add Employee" : "Edit Employee"} type="submit" />
      </form>
    </div>
  );
}

export default AddAndEditEmployeeForm;
