import json
from ..set_up import set_up_departments, set_up_manager, set_up_regular_employee
from django.test import TestCase
from datetime import datetime
from ...models import Department, DeptEmp, DeptManager, Employee, Salary, Title
import unittest
import xmlrunner


class HRManagerViewTestCase(TestCase):
    def setUp(self):
        set_up_departments()
        set_up_manager()
        set_up_regular_employee()

    def test_get_my_organisation_info_view(self):
        response = self.client.get('/hrManagers/getMyOrganisationInfo')
        self.assertEqual(response.status_code, 200)
        self.assertTrue({'department': {'dept_no': 'd903', 'dept_no__dept_name': 'Testing3', 'total': 2}, 'manager': {
                         'dept_no': 'd903', 'emp_no': 8888888, 'emp_no__first_name': 'Practice', 'emp_no__last_name': 'Test'}} in response.data)

    def test_add_employee(self):
        new_employee_details = {"firstName": "John", "lastName": "Smith", "gender": "M", "birthDate": "1994-01-01",
                                "empNum": "7777777", "role": "staff", "department": "d903", "hireDate": "1999-01-01", "salary": "100000"}
        response = self.client.post('/hrManagers/addEmployee', json.dumps(new_employee_details),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Employee Succesfully added to database!')
        new_employee = Employee.objects.get(emp_no=7777777)
        self.assertEqual(new_employee.emp_no, 7777777)
        self.assertEqual(new_employee.first_name, 'John')
        self.assertEqual(new_employee.last_name, 'Smith')
        self.assertEqual(new_employee.gender, 'M')
        self.assertEqual(datetime.strftime(
            new_employee.birth_date, '%Y-%m-%d'), '1994-01-01')
        self.assertEqual(datetime.strftime(
            new_employee.hire_date, '%Y-%m-%d'), '1999-01-01')
        new_dept_employee = DeptEmp.objects.get(emp_no=7777777)
        self.assertEqual(new_dept_employee.emp_no_id, 7777777)
        self.assertEqual(new_dept_employee.dept_no_id, 'd903')
        self.assertEqual(datetime.strftime(
            new_dept_employee.from_date, '%Y-%m-%d'), '1999-01-01')
        self.assertEqual(datetime.strftime(
            new_dept_employee.to_date, '%Y-%m-%d'), '9999-01-01')
        new_title = Title.objects.get(emp_no=7777777)
        self.assertEqual(new_title.emp_no_id, 7777777)
        self.assertEqual(new_title.title, 'staff')
        self.assertEqual(datetime.strftime(
            new_title.from_date, '%Y-%m-%d'), '1999-01-01')
        self.assertEqual(datetime.strftime(
            new_title.to_date, '%Y-%m-%d'), '9999-01-01')
        new_salary = Salary.objects.get(emp_no=7777777)
        self.assertEqual(new_salary.emp_no_id, 7777777)
        self.assertEqual(new_salary.salary, 100000)
        self.assertEqual(datetime.strftime(
            new_salary.from_date, '%Y-%m-%d'), '1999-01-01')
        self.assertEqual(datetime.strftime(
            new_salary.to_date, '%Y-%m-%d'), '9999-01-01')

    def test_edit_employee(self):
        edited_employee_details = {"firstName": "New",
                                   "lastName": "Name",
                                   "gender": "F",
                                   "birthDate": "1990-01-01",
                                   "empNum": 777777,
                                   "originalDeptNo": "d903",
                                   "originalRole": "Senior Staff",
                                   "role": "Expert Staff",
                                   "department": "d907",
                                   "hireDate": "2010-01-01",
                                   "currentDate": "2020-01-01", }
        response = self.client.put('/hrManagers/editEmployee', json.dumps(edited_employee_details),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Employee Details Succesfully Edited in the database!')
        edited_employee = Employee.objects.get(emp_no=777777)
        self.assertEqual(edited_employee.emp_no, 777777)
        self.assertEqual(edited_employee.first_name, 'New')
        self.assertEqual(edited_employee.last_name, 'Name')
        self.assertEqual(edited_employee.gender, 'F')
        self.assertEqual(datetime.strftime(
            edited_employee.birth_date, '%Y-%m-%d'), '1990-01-01')
        self.assertEqual(datetime.strftime(
            edited_employee.hire_date, '%Y-%m-%d'), '2010-01-01')
        edited_dept_employee = DeptEmp.objects.filter(
            emp_no=777777).order_by('to_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_dept_employee[0]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(datetime.strftime(
            edited_dept_employee[1]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(datetime.strftime(
            edited_dept_employee[1]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(edited_dept_employee[1]['dept_no_id'], 'd907')
        edited_title = Title.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_title[1]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(edited_title[0]['title'], 'Expert Staff')

    def test_edit_employee_role_not_manager(self):
        edited_roles_data = {"empNum": 777777,
                             "originalRole": "Senior Staff",
                             "newRole": "Expert Staff",
                             "departmentNo": "d903",
                             "newRoleStartDate": "2020-01-01"}
        response = self.client.put('/hrManagers/editEmployeeRole', json.dumps(edited_roles_data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Title Information updated to the database!')
        edited_title = Title.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_title[1]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(edited_title[0]['title'], 'Expert Staff')

    def test_edit_employee_role_new_manager(self):
        edited_roles_data = {"empNum": 777777,
                             "originalRole": "Senior Staff",
                             "newRole": "Manager",
                             "departmentNo": "d903",
                             "newRoleStartDate": "2020-01-01"}
        response = self.client.put('/hrManagers/editEmployeeRole', json.dumps(edited_roles_data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Title Information updated to the database!')
        edited_title = Title.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_title[1]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(edited_title[0]['title'], 'Manager')
        added_manager = DeptManager.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            added_manager[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            added_manager[0]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(added_manager[0]['dept_no_id'], 'd903')

    def test_edit_employee_role_old_manager(self):
        edited_roles_data = {"empNum": 8888888,
                             "originalRole": "Manager",
                             "newRole": "Staff",
                             "departmentNo": "d903",
                             "newRoleStartDate": "2020-01-01"}
        response = self.client.put('/hrManagers/editEmployeeRole', json.dumps(edited_roles_data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Title Information updated to the database!')
        edited_title = Title.objects.filter(
            emp_no=8888888).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_title[1]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(edited_title[1]['title'], 'Manager')
        self.assertEqual(datetime.strftime(
            edited_title[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_title[0]['from_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(edited_title[0]['title'], 'Staff')
        added_manager = DeptManager.objects.filter(
            emp_no=8888888).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            added_manager[0]['to_date'], '%Y-%m-%d'), '2020-01-01')
        self.assertEqual(added_manager[0]['dept_no_id'], 'd903')

    def test_edit_employee_department(self):
        edited_departments_data = {
            "empNum": 777777,
            "newDepartmentNo": "d906",
            "newDepartmentStartDate": "2021-01-01",
        }
        response = self.client.put('/hrManagers/editEmployeeDepartment', json.dumps(edited_departments_data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Department Information updated to the database!')
        edited_department = DeptEmp.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_department[1]['to_date'], '%Y-%m-%d'), '2021-01-01')
        self.assertEqual(datetime.strftime(
            edited_department[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_department[0]['from_date'], '%Y-%m-%d'), '2021-01-01')
        self.assertEqual(edited_department[0]['dept_no_id'], 'd906')

    def test_edit_employee_salary(self):
        edited_salary_data = {
            "empNum": 777777,
            "newSalary": 80000,
            "newSalaryStartDate": "2022-03-03"
        }
        response = self.client.put('/hrManagers/editEmployeeSalary', json.dumps(edited_salary_data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, 'Salary Information updated to the database!')
        edited_salary = Salary.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            edited_salary[1]['to_date'], '%Y-%m-%d'), '2022-03-03')
        self.assertEqual(datetime.strftime(
            edited_salary[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            edited_salary[0]['from_date'], '%Y-%m-%d'), '2022-03-03')
        self.assertEqual(edited_salary[0]['salary'], 80000)

    def test_add_department(self):
        new_departments_data = {
            "deptNo": "d909",
            "deptName": "Testing9",
            "managersEmpNum": 777777,
            "startDate": "2022-03-04",
        }
        response = self.client.post('/hrManagers/addDepartment', json.dumps(new_departments_data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data['message'], 'Department added to the database!')
        self.assertEqual(
            response.data['newManager']['first_name'], 'Regular')
        self.assertEqual(
            response.data['newManager']['last_name'], 'Employee')
        new_department = Department.objects.filter(
            dept_no='d909').all().values()
        self.assertEqual(new_department[0]['dept_no'], 'd909')
        self.assertEqual(new_department[0]['dept_name'], 'Testing9')
        self.assertEqual(len(new_department), 1)
        new_manager = DeptManager.objects.filter(emp_no=777777).all().values()
        self.assertEqual(len(new_manager), 1)
        self.assertEqual(new_manager[0]['dept_no_id'], 'd909')
        self.assertEqual(datetime.strftime(
            new_manager[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            new_manager[0]['from_date'], '%Y-%m-%d'), '2022-03-04')

        new_dept_emp = DeptEmp.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(len(new_dept_emp), 2)
        self.assertEqual(new_dept_emp[0]['dept_no_id'], 'd909')
        self.assertEqual(datetime.strftime(
            new_dept_emp[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            new_dept_emp[0]['from_date'], '%Y-%m-%d'), '2022-03-04')
        self.assertEqual(new_dept_emp[1]['dept_no_id'], 'd903')
        self.assertEqual(datetime.strftime(
            new_dept_emp[1]['to_date'], '%Y-%m-%d'), '2022-03-04')
        self.assertEqual(datetime.strftime(
            new_dept_emp[1]['from_date'], '%Y-%m-%d'), '2010-01-01')

        new_title = Title.objects.filter(
            emp_no=777777).order_by('-from_date').all().values()
        self.assertEqual(datetime.strftime(
            new_title[1]['to_date'], '%Y-%m-%d'), '2022-03-04')
        self.assertEqual(new_title[1]['title'], 'Senior Staff')
        self.assertEqual(datetime.strftime(
            new_title[0]['to_date'], '%Y-%m-%d'), '9999-01-01')
        self.assertEqual(datetime.strftime(
            new_title[0]['from_date'], '%Y-%m-%d'), '2022-03-04')
        self.assertEqual(new_title[0]['title'], 'Manager')

    def test_add_title(self):
        new_title_data = {
            "titleName": "Tech King",
        }
        Employee.objects.create(first_name='title', last_name='holder',
                                emp_no=935128, birth_date='2000-01-01', gender='M', hire_date='2000-01-01')
        response = self.client.post('/hrManagers/addTitle', json.dumps(new_title_data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Title added to the database!')
        new_title = Title.objects.filter(title='Tech King').all().values()
        self.assertEqual(len(new_title), 1)
        self.assertEqual(new_title[0]['title'], 'Tech King')


if __name__ == '__main__':
    unittest.main(
        testRunner=xmlrunner.XMLTestRunner(output='test-reports'),
        # these make sure that some options that are not applicable
        # remain hidden from the help menu.
        failfast=False, buffer=False, catchbreak=False)
