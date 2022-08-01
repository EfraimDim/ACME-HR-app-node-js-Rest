from django.urls import path
from ..views.hr_managers_views import add_employee, edit_employee, edit_employee_role, edit_employee_department, edit_employee_salary, add_department, add_title, get_my_organisation_info



urlpatterns = [
    path('getMyOrganisationInfo', get_my_organisation_info, name='get_my_organisation_info'),
    path('addEmployee', add_employee, name='add_employee'),
    path('editEmployee', edit_employee, name='edit_employee'),
    path('editEmployeeRole', edit_employee_role, name='edit_employee_role'),
    path('editEmployeeDepartment', edit_employee_department, name='edit_employee_department'),
    path('editEmployeeSalary', edit_employee_salary, name='edit_employee_salary'),
    path('addDepartment', add_department, name='add_department'),
    path('addTitle', add_title, name='add_title'),
]
