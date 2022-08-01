import { useState, useRef } from "react";
import "./styles/App.module.css";
import LoadingButtonComponent from "./components/LoadingButtonComponent";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { AppContext } from "./components/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [loginInfo, setLoginInfo] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [paginationCountEmployee, setPaginationCountEmployee] = useState(1);
  const [paginationEmployeeArray, setPaginationEmployeeArray] = useState([]);
  const [paginationPageEmployee, setPaginationPageEmployee] = useState(1);

  const [paginationCountSalary, setPaginationCountSalary] = useState(1);
  const [paginationSalaryArray, setPaginationSalaryArray] = useState([]);
  const [paginationPageSalary, setPaginationPageSalary] = useState(1);

  const [paginationCountDepEmp, setPaginationCountDepEmp] = useState(1);
  const [paginationDepEmpArray, setPaginationDepEmpArray] = useState([]);
  const [paginationPageDepEmp, setPaginationPageDepEmp] = useState(1);

  const [paginationCountSalaryDepEmp, setPaginationCountSalaryDepEmp] = useState(1);
  const [paginationSalaryArrayDepEmp, setPaginationSalaryArrayDepEmp] = useState([]);
  const [paginationPageSalaryDepEmp, setPaginationPageSalaryDepEmp] = useState(1);

  const [employeeDepInfo, setEmployeeDepInfo] = useState(null);

  const [roleDepartmentToggle, setRoleDepartmentToggle] = useState(true);

  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);

  const [updateRole, setUpdateRole] = useState(false);
  const [updateDepartment, setUpdateDepartment] = useState(false);
  const [updateSalary, setUpdateSalary] = useState(false);

  const [addDepartment, setAddDepartment] = useState(false);
  const [addTitle, setAddTitle] = useState(false);

  const [myInformation, setMyInformation] = useState(null);
  const [myDepartment, setMyDepartment] = useState(null);
  const [myOrganisation, setMyOrganisation] = useState(null);

  const [colleagueOffset, setColleagueOffset] = useState(0)

  const myInformationCalledOnce = useRef(false);
  const myDepartmentInfoCalledOnce = useRef(false);
  const myOrganisationInfoCalledOnce = useRef(false);

  const location = useLocation();

  const displayEmployeeDetails = async (empNo) => {
    try {
      setEditEmployee(false);
      setUpdateRole(false);
      setUpdateDepartment(false);
      const employeesDetails = await axios.get(`/managers/getEmployeeDetails?empNo=${empNo}&accessibility=${loginInfo.user.accessibility}`);
      setPaginationPageSalaryDepEmp(1);
      console.log(employeesDetails.data)
      setPaginationCountSalaryDepEmp(Math.ceil(employeesDetails.data.salaryInfo.length / 10));
      setPaginationSalaryArrayDepEmp(employeesDetails.data.salaryInfo.slice(0, 10));
      setEmployeeDepInfo(employeesDetails.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateNewRoleOnFrontend = (empNo, updatedRole) => {
    const newColleaguesArray = [...loginInfo.colleagues];
    const colleagueToUpdate = newColleaguesArray.find((colleague) => colleague.emp_no === empNo);
    colleagueToUpdate.title.title = updatedRole;
    setPaginationCountEmployee(Math.ceil(newColleaguesArray.length / 10));
    setPaginationEmployeeArray(newColleaguesArray.slice(0, 10));
  };

  return (
    <AppContext.Provider
      value={{
        setLoginInfo,
        loginInfo,
        setLoadSpinner,
        loadSpinner,
        paginationCountEmployee,
        setPaginationCountEmployee,
        paginationEmployeeArray,
        setPaginationEmployeeArray,
        paginationCountSalary,
        setPaginationCountSalary,
        paginationSalaryArray,
        setPaginationSalaryArray,
        paginationPageSalary,
        setPaginationPageSalary,
        paginationPageEmployee,
        setPaginationPageEmployee,
        paginationCountDepEmp,
        setPaginationCountDepEmp,
        paginationDepEmpArray,
        setPaginationDepEmpArray,
        paginationPageDepEmp,
        setPaginationPageDepEmp,
        employeeDepInfo,
        setEmployeeDepInfo,
        paginationCountSalaryDepEmp,
        setPaginationCountSalaryDepEmp,
        paginationSalaryArrayDepEmp,
        setPaginationSalaryArrayDepEmp,
        paginationPageSalaryDepEmp,
        setPaginationPageSalaryDepEmp,
        roleDepartmentToggle,
        setRoleDepartmentToggle,
        addEmployee,
        setAddEmployee,
        location,
        editEmployee,
        setEditEmployee,
        updateRole,
        setUpdateRole,
        updateDepartment,
        setUpdateDepartment,
        displayEmployeeDetails,
        addDepartment,
        setAddDepartment,
        updateSalary,
        setUpdateSalary,
        updateNewRoleOnFrontend,
        addTitle, 
        setAddTitle,
        myInformation, 
        setMyInformation,
        myInformationCalledOnce,
        myDepartmentInfoCalledOnce,
        myDepartment, 
        setMyDepartment,
        myOrganisation, 
        setMyOrganisation,
        myOrganisationInfoCalledOnce,
        colleagueOffset, 
        setColleagueOffset
      }}
    >
      <>
        {loadSpinner && <LoadingButtonComponent loadSpinner={loadSpinner} />}
        {!loadSpinner && loginInfo && <HomePage />}
        {!loadSpinner && !loginInfo && <Login />}
      </>
    </AppContext.Provider>
  );
}

export default App;
