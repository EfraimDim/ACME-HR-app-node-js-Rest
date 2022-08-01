from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import DeptManager, Employee
import json
from rest_framework import status
from ..queries.user_queries.get_employee_department_info import get_employee_department_info
from ..queries.user_queries.get_employee_salary_info import get_employee_salary_info
from ..queries.user_queries.get_employee_title_info import get_employee_title_info
from ..queries.user_queries.get_all_employees import get_all_employees
from ..queries.hr_manager_queries.get_titles_list import get_titles_list
from ..queries.user_queries.get_total_active_employees import get_total_active_employees


@api_view(['POST'])
def user_login(request):
    try:
        post_data = json.loads(request.body.decode('utf-8'))
        employee_id = post_data['employeeID']
        password = post_data['password']
        employee = Employee.objects.filter(emp_no=employee_id).values()
        if(len(employee) == 0):
            return Response('Employee ID Doesnt Exist', status=status.HTTP_400_BAD_REQUEST)
        if(employee[0]['birth_date'].strftime('%Y-%m-%d') == password):
            pass
        else:
            return Response('Incorrect Password', status=status.HTTP_400_BAD_REQUEST)

        depManager = DeptManager.objects.filter(emp_no=employee_id).values()

        if (len(depManager) == 0):
            accessibility = 'regularEmp'
            dept_no = ''
        elif (depManager[0]['dept_no_id'] == 'd003'):
            accessibility = 'managerHR'
            dept_no = depManager[0]['dept_no_id']
        else:
            accessibility = 'manager'
            dept_no = depManager[0]['dept_no_id']

        titles_list = []
        if (accessibility == 'managerHR'):
            titles_list = get_titles_list()

        total_active_employees = get_total_active_employees()

        colleagues = get_all_employees(1000, 0)

        user = {'userInfo': employee[0],
                'accessibility': accessibility, 'dept_no': dept_no}
        response = {'user': user, 'colleagues': colleagues,
                    'titlesList': titles_list, 'totalEmployeeCount': total_active_employees}
        return Response(response)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_my_information(request):
    try:
        employee_id = request.GET.get('employeeID', '')

        dept_info = get_employee_department_info(employee_id)
        salary_info = get_employee_salary_info(employee_id)
        title_info = get_employee_title_info(employee_id)

        response = {'deptInfo': dept_info,
                    'salaryInfo': salary_info, 'titleInfo': title_info}
        return Response(response)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_next_group_of_colleagues(request):
    try:
        offset = request.GET.get('offset', '')
        new_colleagues = get_all_employees(1000, int(offset))
        print(new_colleagues)
        return Response(new_colleagues)
    except:
        return Response('Internal Server Error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
