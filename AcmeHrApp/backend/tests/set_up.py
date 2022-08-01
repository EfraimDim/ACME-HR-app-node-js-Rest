from ..models import Employee, DeptEmp, Department, DeptManager, Salary, Title
from datetime import datetime
from ..queries.query_constant import ACTIVE_EMPLOYEE_TO_DATE


def set_up_departments():
    Department.objects.create(dept_no="d901", dept_name="Testing1")
    Department.objects.create(dept_no="d902", dept_name="Testing2")
    Department.objects.create(dept_no="d903", dept_name="Testing3")
    Department.objects.create(dept_no="d904", dept_name="Testing4")
    Department.objects.create(dept_no="d905", dept_name="Testing5")
    Department.objects.create(dept_no="d906", dept_name="Testing6")
    Department.objects.create(dept_no="d907", dept_name="Testing7")


def set_up_manager():
    Employee.objects.create(first_name="Practice",
                            last_name="Test",
                            gender="M",
                            birth_date=datetime.strptime(
                                '1990-01-01', '%Y-%m-%d'),
                            emp_no=8888888,
                            hire_date=datetime.strptime('2000-01-01', '%Y-%m-%d'))
    DeptEmp.objects.create(dept_no_id="d903", emp_no_id=8888888, from_date=datetime.strptime(
        '2000-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)
    DeptManager.objects.create(dept_no_id="d903", emp_no_id=8888888, from_date=datetime.strptime(
        '2000-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)
    Salary.objects.create(emp_no_id=8888888, salary=100000, from_date=datetime.strptime(
        '2000-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)
    Title.objects.create(emp_no_id=8888888, title="Manager", from_date=datetime.strptime(
        '2000-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)


def set_up_regular_employee():
    Employee.objects.create(first_name="Regular",
                            last_name="Employee",
                            gender="F",
                            birth_date=datetime.strptime(
                                '1999-02-02', '%Y-%m-%d'),
                            emp_no=777777,
                            hire_date=datetime.strptime('2010-01-01', '%Y-%m-%d'))
    DeptEmp.objects.create(dept_no_id="d903", emp_no_id=777777, from_date=datetime.strptime(
        '2010-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)

    Salary.objects.create(emp_no_id=777777, salary=40000, from_date=datetime.strptime(
        '2010-01-01', '%Y-%m-%d'), to_date=datetime.strptime('2012-01-01', '%Y-%m-%d'))

    Salary.objects.create(emp_no_id=777777, salary=50000, from_date=datetime.strptime(
        '2012-01-01', '%Y-%m-%d'), to_date=datetime.strptime(
        '2014-01-01', '%Y-%m-%d'))

    Salary.objects.create(emp_no_id=777777, salary=60000, from_date=datetime.strptime(
        '2014-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)

    Title.objects.create(emp_no_id=777777, title="Staff", from_date=datetime.strptime(
        '2010-01-01', '%Y-%m-%d'), to_date=datetime.strptime(
        '2012-01-01', '%Y-%m-%d'))

    Title.objects.create(emp_no_id=777777, title="Senior Staff", from_date=datetime.strptime(
        '2012-01-01', '%Y-%m-%d'), to_date=ACTIVE_EMPLOYEE_TO_DATE)
