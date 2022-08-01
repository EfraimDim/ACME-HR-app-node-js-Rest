from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Employee, Department
from ..queries.user_queries.get_employee_department_info import get_employee_department_info
from ..queries.user_queries.get_employee_salary_info import get_employee_salary_info
from ..queries.user_queries.get_employee_title_info import get_employee_title_info
from ..queries.manager_queries.get_manager_of_employee import get_manager_of_employee
from ..queries.manager_queries.get_department_employees import get_department_employees


@api_view(['GET'])
def get_employee_details(request):
    try:
        employee_id = request.GET.get('empNo', '')
        accessibility = request.GET.get('accessibility', '')
        employee = Employee.objects.filter(emp_no=employee_id).values()
        dept_info = get_employee_department_info(employee_id)
        salary_info = get_employee_salary_info(employee_id)
        title_info = get_employee_title_info(employee_id)
        employees_manager = ''
        user = {'userInfo': employee[0]}
        if (accessibility == 'managerHR'):
            employees_manager = get_manager_of_employee(
                dept_info[0]['dept_emp']['dept_no'])
        response = {'user': user, 'deptInfo': dept_info, 'salaryInfo': salary_info,
                    'titleInfo': title_info, 'employeesManager': employees_manager}
        return Response(response)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_my_department_info(request):
    try:
        dept_no = request.GET.get('deptNo', '')
        department_employees = get_department_employees(dept_no)
        department = Department.objects.filter(
            dept_no=dept_no).all().values('dept_no', 'dept_name')
        response = {
            'department': department[0], 'departmentEmployees': department_employees}
        return Response(response)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
