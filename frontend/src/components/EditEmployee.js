import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import swal from "sweetalert";
import AddAndEditEmployeeForm from "./AddAndEditEmployeeForm";

function EditEmployee() {
  const { employeeDepInfo, setEmployeeDepInfo, loginInfo, setPaginationCountEmployee, setPaginationEmployeeArray, setEditEmployee } =
    useContext(AppContext);

  const [firstName, setFirstName] = useState(employeeDepInfo.user.userInfo.first_name);
  const [lastName, setLastName] = useState(employeeDepInfo.user.userInfo.last_name);
  const [gender, setGender] = useState(employeeDepInfo.user.userInfo.gender);
  const [birthDate, setBirthDate] = useState(employeeDepInfo.user.userInfo.birth_date);
  const [empNum, setEmpNum] = useState(`${employeeDepInfo.user.userInfo.emp_no}`);
  const [role, setRole] = useState(employeeDepInfo.titleInfo[0].title);
  const [department, setDepartment] = useState(employeeDepInfo.deptInfo[0].departments.dept_no);
  const [hireDate, setHireDate] = useState(employeeDepInfo.user.userInfo.hire_date);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleEmpNum = (e) => {
    setEmpNum(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleHireDate = (e) => {
    setHireDate(e.target.value);
  };

  const editEmployee = async (ev) => {
    try {
      ev.preventDefault();
      const currentDate = new Date().toISOString().split("T")[0];
      const editEmployeeDetails = await axios.put("/hrManagers/editEmployee", {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDate: birthDate,
        empNum: empNum,
        originalDeptNo: employeeDepInfo.deptInfo[0].departments.dept_no,
        originalRole: employeeDepInfo.titleInfo[0].title,
        role: role,
        department: department,
        hireDate: hireDate,
        currentDate: currentDate,
      });
      swal({
        title: "Success!",
        text: `${editEmployeeDetails.data}`,
        icon: "success",
        button: "continue!",
      });
      const newEmployeeInfo = { ...employeeDepInfo };
      newEmployeeInfo.user.userInfo.first_name = firstName;
      newEmployeeInfo.user.userInfo.last_name = lastName;
      newEmployeeInfo.user.userInfo.gender = gender;
      newEmployeeInfo.user.userInfo.birth_date = birthDate;
      if (role !== employeeDepInfo.titleInfo[0].title) {
        newEmployeeInfo.titleInfo[0].to_date = currentDate;
        newEmployeeInfo.titleInfo.unshift({
          emp_no: employeeDepInfo.user.userInfo.emp_no,
          title: role,
          from_date: currentDate,
          to_date: "9999-01-01",
        });
      }
      if (department !== employeeDepInfo.deptInfo[0].departments.dept_no) {
        newEmployeeInfo.deptInfo[0].departments.to_date = currentDate;
        const departmentName = loginInfo.deptWithManagersList.filter((depart) => depart.department.dept_no === department);
        newEmployeeInfo.deptInfo.unshift({
          departments: { dept_name: departmentName[0].department.dept_no__dept_name, dept_no: departmentName[0].department.dept_no },
          dept_emp: { emp_no: employeeDepInfo.user.userInfo.emp_no, dept_no: department, from_date: currentDate, to_date: "9999-01-01" },
        });
      }
      setEmployeeDepInfo(newEmployeeInfo);
      const newColleaguesArray = [...loginInfo.colleagues];
      const colleagueToUpdate = newColleaguesArray.find((colleague) => JSON.stringify(colleague.emp_no) === empNum);
      colleagueToUpdate.first_name = firstName;
      colleagueToUpdate.last_name = lastName;
      colleagueToUpdate.title.title = role;
      colleagueToUpdate.hire_date = hireDate;
      setPaginationCountEmployee(Math.ceil(newColleaguesArray.length / 10));
      setPaginationEmployeeArray(newColleaguesArray.slice(0, 10));
      setEditEmployee(false);
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
      <AddAndEditEmployeeForm
        handleSubmit={editEmployee}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        birthDate={birthDate}
        empNum={empNum}
        role={role}
        department={department}
        hireDate={hireDate}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleGender={handleGender}
        handleBirthDate={handleBirthDate}
        handleEmpNum={handleEmpNum}
        handleRole={handleRole}
        handleDepartment={handleDepartment}
        handleHireDate={handleHireDate}
        addEmployee={false}
      />
    </div>
  );
}

export default EditEmployee;
