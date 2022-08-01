from ...models import DeptManager
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def add_new_employee_dept_manager(employee_id, new_dept_no, new_start_date):
    DeptManager.objects.create(emp_no_id=employee_id, dept_no_id=new_dept_no,
                               from_date=new_start_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
