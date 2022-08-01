from ...models import Title
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def add_new_employee_title(employee_id, new_role, new_start_date):
    Title.objects.create(emp_no_id=employee_id, title=new_role,
                         from_date=new_start_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
