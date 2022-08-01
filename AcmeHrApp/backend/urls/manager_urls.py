from django.urls import path
from ..views.managers_views import get_employee_details, get_my_department_info

urlpatterns = [
    path('getEmployeeDetails', get_employee_details, name='get_employee_details'),
    path('getMyDepartmentInfo', get_my_department_info, name='getEmployeeDetails'),
]
