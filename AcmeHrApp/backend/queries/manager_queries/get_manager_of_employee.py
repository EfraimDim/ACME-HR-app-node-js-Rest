from ...models import DeptManager
from ...serializers import EmployeeSerializer


def get_manager_of_employee(dept_no):
    dept_manager = DeptManager.objects.select_related('emp_no').filter(
        dept_no = dept_no, to_date = '9999-01-01').all()
    return EmployeeSerializer(dept_manager[0].emp_no).data