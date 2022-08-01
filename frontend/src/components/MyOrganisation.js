import styles from "../styles/MyOrganisation.module.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import HREmployees from "./HREmployees";
import AddEmployee from "./AddEmployee";
import HRDepartments from "./HRDepartments";
import HRRolesAndTitles from "./HRRolesAndTitles";
import AddDepartment from "./AddDepartment";
import AddTitle from "./AddTitle";
import axios from "axios";

function MyOrganisation() {
  const { addEmployee, addDepartment, addTitle, setMyOrganisation, myOrganisationInfoCalledOnce, myOrganisation } = useContext(AppContext);

  const [employees, setEmployees] = useState(true);
  const [departments, setDepartments] = useState(false);

  const toggleEmployees = () => {
    setEmployees(true);
    setDepartments(false);
  };

  const toggleDepartments = () => {
    setEmployees(false);
    setDepartments(true);
  };

  const toggleRolesAndTitles = () => {
    setEmployees(false);
    setDepartments(false);
  };

  const getMyOrganisationInfo = async () => {
    try {
      const myOrganisationInfo = await axios.get("/hrManagers/getMyOrganisationInfo");
      setMyOrganisation(myOrganisationInfo.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (myOrganisationInfoCalledOnce.current) {
      return;
    } else {
      getMyOrganisationInfo();
      myOrganisationInfoCalledOnce.current = true;
    }
  });

  return (
    <>
      {myOrganisation && (
        <div>
          <h1 className={styles.headerMain}>Organisation</h1>
          <div className={styles.departmentName}>ACME HR</div>
          <div className={styles.toggleWrapper}>
            <h2 onClick={toggleEmployees} className={employees && !departments ? styles.active : styles.unActive}>
              Employees
            </h2>
            <h2 onClick={toggleDepartments} className={!employees && departments ? styles.active : styles.unActive}>
              Departments
            </h2>
            <h2 onClick={toggleRolesAndTitles} className={!employees && !departments ? styles.active : styles.unActive}>
              Role & Titles
            </h2>
          </div>
          {employees && !departments && <>{addEmployee ? <AddEmployee /> : <HREmployees />}</>}
          {!employees && departments && <>{addDepartment ? <AddDepartment /> : <HRDepartments />}</>}
          {!employees && !departments && <>{addTitle ? <AddTitle /> : <HRRolesAndTitles />}</>}
        </div>
      )}
    </>
  );
}

export default MyOrganisation;
