import styles from "../styles/MyDepartment.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import EmployeeTable from "./EmployeeTable";
import InformationBasic from "./InformationBasic";
import InformationRoleHistory from "./InformationRoleHistory";
import InformationSalary from "./InformationSalary";
import RoleDepartmentToggle from "./RoleDepartmentToggle";
import InformationDepartmentHistory from "./InformationDepartmentHistory";
import axios from "axios";
import LoadingSpinner from "./LoadingButtonComponent"

function MyDepartment() {
  const {
    loginInfo,
    paginationPageDepEmp,
    setPaginationPageDepEmp,
    setPaginationDepEmpArray,
    paginationDepEmpArray,
    paginationCountDepEmp,
    employeeDepInfo,
    paginationCountSalaryDepEmp,
    paginationSalaryArrayDepEmp,
    setPaginationSalaryArrayDepEmp,
    paginationPageSalaryDepEmp,
    setPaginationPageSalaryDepEmp,
    roleDepartmentToggle,
    setPaginationCountDepEmp,
    setMyDepartment,
    myDepartmentInfoCalledOnce,
    myDepartment,
  } = useContext(AppContext);

  const getMyDepartmentInfo = async () => {
    try {
      const myDepartmentInfo = await axios.get(`/managers/getMyDepartmentInfo?deptNo=${loginInfo.user.dept_no}`);
      setPaginationCountDepEmp(Math.ceil(myDepartmentInfo.data.departmentEmployees.length / 10));
      setPaginationDepEmpArray(myDepartmentInfo.data.departmentEmployees.slice(0, 10));
      setMyDepartment(myDepartmentInfo.data);
      console.log(myDepartmentInfo.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (myDepartmentInfoCalledOnce.current) {
      return;
    } else {
      getMyDepartmentInfo();
      myDepartmentInfoCalledOnce.current = true;
    }
  });

  return (
    <>
      {!myDepartment ? (
        <LoadingSpinner loadSpinner={!myDepartment} />
      ) : (
        <>
          {myDepartment && (
            <div>
              <h1 className={styles.headerMain}>Department</h1>
              <div className={styles.departmentName}>{myDepartment.department.dept_name}</div>
              <EmployeeTable
                manager={true}
                arrayToPaginate={myDepartment.departmentEmployees}
                paginatedArray={paginationDepEmpArray}
                setPaginatedArray={setPaginationDepEmpArray}
                paginationCount={paginationCountDepEmp}
                paginationPage={paginationPageDepEmp}
                setPaginationPage={setPaginationPageDepEmp}
              />
              {employeeDepInfo && (
                <>
                  <InformationBasic employeeInfo={employeeDepInfo} />
                  <RoleDepartmentToggle />
                  {roleDepartmentToggle ? (
                    <InformationRoleHistory employeeInfo={employeeDepInfo} />
                  ) : (
                    <InformationDepartmentHistory employeeInfo={employeeDepInfo} />
                  )}
                  <InformationSalary
                    arrayToPaginate={employeeDepInfo.salaryInfo}
                    paginatedArray={paginationSalaryArrayDepEmp}
                    setPaginatedArray={setPaginationSalaryArrayDepEmp}
                    paginationCount={paginationCountSalaryDepEmp}
                    paginationPage={paginationPageSalaryDepEmp}
                    setPaginationPage={setPaginationPageSalaryDepEmp}
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyDepartment;
