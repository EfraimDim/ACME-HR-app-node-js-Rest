import InformationBasic from "./InformationBasic";
import InformationRoleHistory from "./InformationRoleHistory";
import InformationDepartmentHistory from "./InformationDepartmentHistory";
import InformationSalary from "./InformationSalary";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import RoleDepartmentToggle from "./RoleDepartmentToggle";
import axios from "axios"

function MyInformation() {
  const {
    loginInfo,
    setPaginationSalaryArray,
    paginationSalaryArray,
    paginationCountSalary,
    paginationPageSalary,
    setPaginationPageSalary,
    roleDepartmentToggle,
    setPaginationCountSalary,
    setMyInformation,
    myInformationCalledOnce,
    myInformation
  } = useContext(AppContext);

  const getMyInformation = async () => {
    try {
      const myInformation = await axios.get(`/users/getMyInformation?employeeID=${loginInfo.user.userInfo.emp_no}`);
      setPaginationCountSalary(Math.ceil(myInformation.data.salaryInfo.length / 10));
      setPaginationSalaryArray(myInformation.data.salaryInfo.slice(0, 10));
      setMyInformation({...loginInfo, ...myInformation.data});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (myInformationCalledOnce.current) {
      return;
    } else {
      getMyInformation();
      myInformationCalledOnce.current = true;
    }
  });

  return (
    <>
      {myInformation && (
        <div>
          <InformationBasic employeeInfo={myInformation} />
          <RoleDepartmentToggle />
          {roleDepartmentToggle ? (
            <InformationRoleHistory employeeInfo={myInformation} />
          ) : (
            <InformationDepartmentHistory employeeInfo={myInformation} />
          )}
          <InformationSalary
            arrayToPaginate={myInformation.salaryInfo}
            paginatedArray={paginationSalaryArray}
            setPaginatedArray={setPaginationSalaryArray}
            paginationCount={paginationCountSalary}
            paginationPage={paginationPageSalary}
            setPaginationPage={setPaginationPageSalary}
          />
        </div>
      )}
    </>
  );
}

export default MyInformation;
