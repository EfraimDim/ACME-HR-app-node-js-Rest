from ...models import Salary
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def add_new_employee_salary(employee_id, new_salary, new_salary_start_date):
    Salary.objects.create(emp_no_id=employee_id, salary=new_salary,
                          from_date=new_salary_start_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
