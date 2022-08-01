from ...models import Title
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def find_new_managers_current_role(managers_employee_id):
    current_role = Title.objects.filter(
        emp_no=managers_employee_id, to_date=ACTIVE_EMPLOYEE_TO_DATE).all().values()
    return current_role[0]['title']
