from operator import itemgetter
from ...models import Employee, DeptEmp, Salary, Title
from ..query_constant import ACTIVE_EMPLOYEE_TO_DATE


def add_employee_to_database(employee_data):
    first_name, last_name, gender, birth_date, employee_id_string, role, department, hire_date, salary = itemgetter(
        'firstName', 'lastName', 'gender', 'birthDate', 'empNum', 'role', 'department', 'hireDate', 'salary')(employee_data)
    employee_id = int(employee_id_string)
    Employee.objects.create(first_name=first_name, last_name=last_name,
                            emp_no=employee_id, birth_date=birth_date, gender=gender, hire_date=hire_date)
    DeptEmp.objects.create(emp_no_id=employee_id, dept_no_id=department,
                           from_date=hire_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
    Title.objects.create(emp_no_id=employee_id, title=role,
                         from_date=hire_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
    Salary.objects.create(emp_no_id=employee_id, salary=salary,
                          from_date=hire_date, to_date=ACTIVE_EMPLOYEE_TO_DATE)
