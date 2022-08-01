from ...models import Employee
from ...serializers import EmployeesAndTitles


def get_department_employees(dept_no):
    dept_emp = Employee.objects.select_related('title', 'deptemp').filter(
        title__to_date='9999-01-01', deptemp__dept_no = dept_no).order_by('-hire_date').all()
    return EmployeesAndTitles(dept_emp, many=True).data
