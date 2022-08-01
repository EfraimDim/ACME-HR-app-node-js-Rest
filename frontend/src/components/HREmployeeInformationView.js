import { useContext } from "react";
import { AppContext } from "./AppContext";
import InformationBasic from "./InformationBasic";
import InformationRoleHistory from "./InformationRoleHistory";
import InformationSalary from "./InformationSalary";
import RoleDepartmentToggle from "./RoleDepartmentToggle";
import InformationDepartmentHistory from "./InformationDepartmentHistory";
import UpdateRole from "./UpdateRole";
import UpdateDepartment from "./UpdateDepartment";
import UpdateSalary from "./UpdateSalary";

function HREmployeeInformationView() {
  const {
    employeeDepInfo,
    paginationCountSalaryDepEmp,
    paginationSalaryArrayDepEmp,
    setPaginationSalaryArrayDepEmp,
    paginationPageSalaryDepEmp,
    setPaginationPageSalaryDepEmp,
    roleDepartmentToggle,
    updateRole,
    updateDepartment,
    updateSalary
  } = useContext(AppContext);



  return (
    <>
      {employeeDepInfo && (
        <>
          <InformationBasic employeeInfo={employeeDepInfo} />
          {!updateRole && !updateDepartment && (
            <>
              <RoleDepartmentToggle />
              {roleDepartmentToggle ? (
                <InformationRoleHistory employeeInfo={employeeDepInfo} />
              ) : (
                <InformationDepartmentHistory employeeInfo={employeeDepInfo} />
              )}
            </>
          )}
          {updateRole && <UpdateRole />}
          {updateDepartment && <UpdateDepartment />}


          {updateSalary && <UpdateSalary />}
          {!updateSalary && (
            <InformationSalary
              arrayToPaginate={employeeDepInfo.salaryInfo}
              paginatedArray={paginationSalaryArrayDepEmp}
              setPaginatedArray={setPaginationSalaryArrayDepEmp}
              paginationCount={paginationCountSalaryDepEmp}
              paginationPage={paginationPageSalaryDepEmp}
              setPaginationPage={setPaginationPageSalaryDepEmp}
            />
          )}
        </>
      )}
    </>
  );
}

export default HREmployeeInformationView;
