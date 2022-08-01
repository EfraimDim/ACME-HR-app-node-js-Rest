import styles from "../styles/InformationRoleHistory.module.css";

function InformationDepartmentHistory({ employeeInfo }) {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.infoWrapper}>
          <div className={styles.tableHeader}>Department</div>
          <div className={styles.tableHeader}>Start Date</div>
          <div className={styles.tableHeader}>End Date</div>
        </div>
        {employeeInfo.deptInfo.map((deptInfo, index) => {
              return (
                <div key={index} className={styles.infoWrapper}>
                  <div className={styles.tableInfo}>{deptInfo.departments.dept_name}</div>
                  <div className={styles.tableInfo}>{deptInfo.dept_emp.from_date}</div>
                  <div className={styles.tableInfo}>{deptInfo.dept_emp.to_date}</div>
                </div>
              );
            })
            }
      </div>
    </div>
  );
}

export default InformationDepartmentHistory;
