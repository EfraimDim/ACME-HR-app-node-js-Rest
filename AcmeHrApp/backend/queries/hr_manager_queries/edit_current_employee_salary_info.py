from ...models import Salary
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def edit_current_employee_salary_info(employee_id, new_salary_start_date):
    Salary.objects.filter(emp_no=employee_id, to_date=ACTIVE_EMPLOYEE_TO_DATE).update(
        to_date=new_salary_start_date)
