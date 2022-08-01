from ...models import DeptEmp
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def edit_current_employee_department_info(employee_id, end_date):
    DeptEmp.objects.filter(
        emp_no=employee_id, to_date=ACTIVE_EMPLOYEE_TO_DATE).update(to_date=end_date)
