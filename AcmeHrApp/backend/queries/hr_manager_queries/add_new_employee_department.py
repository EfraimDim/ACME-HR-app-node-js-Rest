from ...models import DeptEmp
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def add_new_employee_department(employee_id, new_dept_no, new_start_date):
    DeptEmp.objects.create(emp_no_id=employee_id, dept_no_id=new_dept_no,
                           from_date=new_start_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
