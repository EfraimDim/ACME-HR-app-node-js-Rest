from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Employee
import json
from rest_framework import status
from operator import itemgetter
from ..queries.hr_manager_queries.add_employee_to_database import add_employee_to_database
from ..queries.hr_manager_queries.edit_current_employee_basic_info import edit_current_employee_basic_info
from ..queries.hr_manager_queries.edit_current_employee_title_info import edit_current_employee_title_info
from ..queries.hr_manager_queries.add_new_employee_title import add_new_employee_title
from ..queries.hr_manager_queries.edit_current_employee_department_info import edit_current_employee_department_info
from ..queries.hr_manager_queries.add_new_employee_department import add_new_employee_department
from ..queries.hr_manager_queries.add_new_employee_dept_manager import add_new_employee_dept_manager
from ..queries.hr_manager_queries.edit_current_employee_dept_manager_info import edit_current_employee_dept_manager_info
from ..queries.hr_manager_queries.edit_current_employee_salary_info import edit_current_employee_salary_info
from ..queries.hr_manager_queries.add_new_employee_salary import add_new_employee_salary
from ..queries.hr_manager_queries.find_new_managers_current_role import find_new_managers_current_role
from ..queries.hr_manager_queries.add_new_department import add_new_department
from ..queries.hr_manager_queries.add_new_title import add_new_title
from ..queries.hr_manager_queries.get_department_info_for_hr import get_department_info_for_hr
from ..queries.hr_manager_queries.get_department_manager_info_for_hr import get_department_manager_info_for_hr


@api_view(['GET'])
def get_my_organisation_info(request):
    try:
        departments_list = get_department_info_for_hr()
        managers_list = get_department_manager_info_for_hr()
        dept_with_managers_list = []
        for i in range(0, len(departments_list)):
            department_with_manager = {
                'department': departments_list[i], 'manager': managers_list[i]}
            dept_with_managers_list.append(department_with_manager)
        return Response(dept_with_managers_list)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_employee(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        employee_id = itemgetter('empNum')(employee_data)
        employee_id_available = Employee.objects.filter(
            emp_no=employee_id).values()
        if (len(employee_id_available) == 0):
            pass
        else:
            return Response('Employee ID taken', status=status.HTTP_400_BAD_REQUEST)
        add_employee_to_database(employee_data)
        return Response('Employee Succesfully added to database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def edit_employee(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        first_name, last_name, gender, birth_date, employee_id, new_role, new_dept_no, hire_date, original_dept_no, original_role, current_date = itemgetter(
            'firstName', 'lastName', 'gender', 'birthDate', 'empNum', 'role', 'department', 'hireDate', 'originalDeptNo', 'originalRole', 'currentDate')(employee_data)
        edit_current_employee_basic_info(
            first_name, last_name, gender, birth_date, employee_id, hire_date)
        if (new_role != original_role):
            edit_current_employee_title_info(employee_id, current_date)
            add_new_employee_title(employee_id, new_role, current_date)

        if (new_dept_no != original_dept_no):
            edit_current_employee_department_info(employee_id, current_date)
            add_new_employee_department(employee_id, new_dept_no, current_date)

        if (new_role == "Manager" and original_role != "Manager"):
            add_new_employee_dept_manager(
                employee_id, new_dept_no, current_date)

        if (original_role == "Manager" and new_role != "Manager"):
            edit_current_employee_dept_manager_info(employee_id, current_date)

        return Response('Employee Details Succesfully Edited in the database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def edit_employee_role(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        employee_id, dept_no, original_role, new_role, new_role_start_date = itemgetter(
            'empNum', 'departmentNo', 'originalRole', 'newRole', 'newRoleStartDate')(employee_data)
        edit_current_employee_title_info(employee_id, new_role_start_date)
        add_new_employee_title(employee_id, new_role, new_role_start_date)
        if (new_role == "Manager" and original_role != "Manager"):
            add_new_employee_dept_manager(
                employee_id, dept_no, new_role_start_date)
        if (original_role == "Manager" and new_role != "Manager"):
            edit_current_employee_dept_manager_info(
                employee_id, new_role_start_date)
        return Response('Title Information updated to the database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def edit_employee_department(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        employee_id, new_dept_no, new_department_start_date = itemgetter(
            'empNum', 'newDepartmentNo', 'newDepartmentStartDate')(employee_data)
        edit_current_employee_department_info(
            employee_id, new_department_start_date)
        add_new_employee_department(
            employee_id, new_dept_no, new_department_start_date)
        return Response('Department Information updated to the database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def edit_employee_salary(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        employee_id, new_salary, new_salary_start_date = itemgetter(
            'empNum', 'newSalary', 'newSalaryStartDate')(employee_data)
        edit_current_employee_salary_info(employee_id, new_salary_start_date)
        add_new_employee_salary(employee_id, new_salary, new_salary_start_date)
        return Response('Salary Information updated to the database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_department(request):
    try:
        employee_data = json.loads(request.body.decode('utf-8'))
        managers_employee_id, dept_no, dept_name, start_date = itemgetter(
            'managersEmpNum', 'deptNo', 'deptName', 'startDate')(employee_data)

        emp_id_exists = Employee.objects.filter(
            emp_no=managers_employee_id).values()
        if (len(emp_id_exists) != 0):
            managers_current_role = find_new_managers_current_role(
                managers_employee_id)
            new_manager = emp_id_exists[0]
        else:
            return Response('Employee Number Does not Exist', status=status.HTTP_400_BAD_REQUEST)

        add_new_department(dept_no, dept_name)
        edit_current_employee_department_info(managers_employee_id, start_date)
        add_new_employee_department(managers_employee_id, dept_no, start_date)
        edit_current_employee_title_info(managers_employee_id, start_date)
        add_new_employee_title(managers_employee_id, "Manager", start_date)
        if (managers_current_role == "Manager"):
            edit_current_employee_dept_manager_info(
                managers_employee_id, start_date)
        add_new_employee_dept_manager(
            managers_employee_id, dept_no, start_date)
        response = {'message': 'Department added to the database!',
                    'newManager': new_manager}
        return Response(response)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_title(request):
    try:
        title_data = json.loads(request.body.decode('utf-8'))
        title_name = itemgetter('titleName')(title_data)
        add_new_title(title_name)
        return Response('Title added to the database!')
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
